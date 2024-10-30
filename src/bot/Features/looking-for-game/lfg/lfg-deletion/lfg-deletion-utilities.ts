import { TextChannel, VoiceChannel } from "discord.js";
import VoiceChannelsUtilities from "../../../../Discord-Api/guilds/channels/voice-channels/voice-channels-utilities.js";
import lfgCollection from "../lfg-collection.js";
import TextChannelsUtilities from "../../../../Discord-Api/guilds/channels/text-channels/text-channels-utilities.js";
import LfgRolesUtilities from "../../lfg-roles/lfg-roles-utilities.js";

class LfgDeletionUtilities {
  public static isVoiceChannelLfg(channel: VoiceChannel) {
    return lfgCollection.getCachePostsByVoiceChannel(channel.id).length ? true : false;
  }

  public static isLfgVoiceChannelEmpty(channel: VoiceChannel) {
    return LfgDeletionUtilities.isVoiceChannelLfg(channel) && VoiceChannelsUtilities.isChannelEmpty(channel);
  }

  public static async isLfgTextChannelEmpty(channel: TextChannel) {
    return LfgRolesUtilities.isLfgName(channel.name?.replaceAll("-", " ")) && (await TextChannelsUtilities.isChannelEmpty(channel));
  }
}

export default LfgDeletionUtilities;
