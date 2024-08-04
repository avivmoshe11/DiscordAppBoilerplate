import { EmbedField, GuildMember, OverwriteResolvable, PermissionResolvable, Role, Snowflake } from "discord.js";
import EmbedUtilities from "../../../../Utilities/embed-utilities.js";
import { LfgRole } from "../../lfg-roles/lfg-roles-definitions.js";
import { LfgPost } from "../lfg-definitions.js";
import botConfiguration from "../../../../bot-configuration.js";

class LfgCreationUtilities {
  public static extractRoleIds(text: string): Array<string> {
    const regex = /<@&(\d+)>/g;
    const ids: Set<string> = new Set();
    let match;

    while ((match = regex.exec(text)) !== null) {
      ids.add(match[1]);
    }

    return Array.from(ids);
  }

  public static extractAdditionalInfo(text: string) {
    const regex = /<@&\d+>/g;

    return text
      .split(regex)
      .filter(Boolean)
      .map((part) => part.trim())
      .join(" ");
  }

  public static getLfgTextChannelPermissions(): Array<OverwriteResolvable> {
    return [
      {
        id: botConfiguration.roles.everyone.id,
        deny: ["SendMessages"]
      }
    ];
  }

  public static formatLfgEmbed(member: GuildMember, additionalInfo: string, role: LfgRole, requestId: string, voiceId: Snowflake) {
    const fields: Array<EmbedField> = [];

    fields.push({ name: "Game Mode", value: `<@&${role.id}>`, inline: true });
    fields.push({ name: "Voice chat", value: `<#${voiceId}>`, inline: true });

    return EmbedUtilities.createAdvancedEmbed({
      title: `${member.displayName} is looking for game`,
      description: additionalInfo !== "" ? additionalInfo : "Join my lfg lobby!",
      fields,
      footer: { text: `${requestId}` }
    });
  }

  public static formatLfgPostEntry(
    channelId: Snowflake,
    complementaryRoles: Array<Snowflake>,
    lfgRole: LfgRole,
    userId: Snowflake,
    requestId: string,
    messageId: string,
    voiceChannelId: string
  ): LfgPost {
    return {
      channelId,
      complementaryRoles,
      lfgRole,
      userId,
      requestId,
      messageId,
      voiceChannelId
    };
  }

  public static formatStrictPermissions(complementary: Array<Role>): Array<OverwriteResolvable> {
    return [
      {
        id: botConfiguration.roles.everyone.id,
        deny: ["Connect"]
      },
      ...complementary.map((role) => ({
        id: role.id,
        allow: ["Connect"] as PermissionResolvable
      }))
    ];
  }
}

export default LfgCreationUtilities;
