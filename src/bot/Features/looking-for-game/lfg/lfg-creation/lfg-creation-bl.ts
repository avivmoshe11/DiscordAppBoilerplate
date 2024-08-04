import { ChatInputCommandInteraction, Guild, GuildMember, Role, Snowflake, TextBasedChannel } from "discord.js";
import RolesApi from "../../../guilds/roles/roles-api.js";
import excludedRolesCollection from "../../excluded-roles/excluded-roles-collection.js";
import lfgRolesCollection from "../../lfg-roles/lfg-roles-collection.js";
import lfgCollection from "../lfg-collection.js";
import TextChannelsApi from "../../../guilds/channels/text-channels/text-channels-api.js";
import { LfgRole } from "../../lfg-roles/lfg-roles-definitions.js";
import botConfiguration from "../../../../bot-configuration.js";
import ChannelsApi from "../../../guilds/channels/channels-api.js";
import LfgCreationUtilities from "./lfg-creation-utilities.js";
import { v4 } from "uuid";
import VoiceChannelsApi from "../../../guilds/channels/voice-channels/voice-channels-api.js";
import botConsoleUtilities from "../../../../../Utilities/console/bot-console-utilities.js";

class LfgCreationBL {
  public async createLfg(interaction: ChatInputCommandInteraction, roleIds: Array<string>, info: string, strict: boolean) {
    const requestId = v4();
    const { lfg, complementary } = await this.divideLfgRolesInput(roleIds, interaction.guild as Guild);

    if (lfg.length === 0) {
      return "Invalid request, no lfg role was selected";
    }

    const voiceChannel = await this.handleVoiceChannelCreate(interaction, complementary, strict);

    for (const role of lfg) {
      const lfgRole = lfgRolesCollection.getCacheById(role.id);
      await this.postLfg(interaction.member as GuildMember, lfgRole, complementary, info, interaction.guild as Guild, requestId, voiceChannel.id);
    }

    return `Lfg request process complete for request "${requestId}"`;
  }

  private async divideLfgRolesInput(roleIds: Array<string>, guild: Guild) {
    const roles = await this.getValidRoles(roleIds, guild);

    return {
      lfg: roles.filter((role) => lfgRolesCollection.getCacheById(role.id)),
      complementary: roles.filter((role) => !lfgRolesCollection.getCacheById(role.id))
    };
  }

  private async getAllRoles(roleIds: Array<string>, guild: Guild) {
    const promises: Array<Promise<Role | null>> = [];
    const rolesApi = new RolesApi(guild);

    for (const id of roleIds) {
      promises.push(rolesApi.getRoleById(id));
    }

    return Promise.all(promises);
  }

  private async getValidRoles(roleIds: Array<string>, guild: Guild) {
    const roleResponses = await this.getAllRoles(roleIds, guild);
    return roleResponses.filter((role) => role && !excludedRolesCollection.getCacheById(role.id)) as Array<Role>;
  }

  private async createLfgChannel(lfgRole: LfgRole, guild: Guild) {
    const channelId = lfgCollection.getCachePostsByLfgRole(lfgRole.id)[0]?.channelId;

    if (channelId) {
      const channelsApi = new ChannelsApi(guild);
      return channelsApi.getChannelById(channelId);
    }

    const textChannelApi = new TextChannelsApi(guild);
    const permissions = LfgCreationUtilities.getLfgTextChannelPermissions();
    const newChannel = await textChannelApi.createTextChannel(lfgRole.name, botConfiguration.channels.categories.voice.id, permissions);

    return newChannel;
  }

  private async postLfg(member: GuildMember, role: LfgRole, complementaryRoles: Array<Role>, info: string, guild: Guild, requestId: string, voiceId: Snowflake) {
    const lfgRole = lfgRolesCollection.getCacheById(role.id);
    const channel = (await this.createLfgChannel(lfgRole, guild)) as TextBasedChannel;

    if (channel) {
      const embed = LfgCreationUtilities.formatLfgEmbed(member, info, role, requestId, voiceId);
      const message = await channel.send({ content: `<@&${role.id}>${complementaryRoles.map((role) => `<@&${role.id}>`).join(" ")}`, embeds: [embed] });

      const lfgPost = LfgCreationUtilities.formatLfgPostEntry(
        channel.id,
        complementaryRoles.map((role) => role.id),
        role,
        member.id,
        requestId,
        message.id,
        voiceId
      );

      await lfgCollection.insetPost(lfgPost);
    }
  }

  private async createVoiceChannel(interaction: ChatInputCommandInteraction, complementary: Array<Role>, strict: boolean) {
    const channelName = (interaction.member instanceof GuildMember && `${interaction.member.displayName}'s lobby`) || "Lfg Room";
    const voiceChannelsApi = new VoiceChannelsApi(interaction.guild as Guild);
    const permissions = strict ? LfgCreationUtilities.formatStrictPermissions(complementary) : [];

    return voiceChannelsApi.createVoiceChannel(channelName, botConfiguration.channels.categories.voice.id, permissions, 6);
  }

  private async handleVoiceChannelCreate(interaction: ChatInputCommandInteraction, complementary: Array<Role>, strict: boolean) {
    const voiceChannel = await this.createVoiceChannel(interaction, complementary, strict);
    interaction.member instanceof GuildMember && interaction.member.voice.channel && (await interaction.member.voice.setChannel(voiceChannel.id));

    return voiceChannel;
  }

  private log(msg: string) {
    botConsoleUtilities.error(msg, "LFG", "lfg-creation-process");
  }
}

export default new LfgCreationBL();
