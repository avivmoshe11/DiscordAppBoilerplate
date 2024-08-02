import { TextChannel, VoiceChannel } from "discord.js";
import LfgCreationUtilities from "./lfg-creation/lfg-creation-utilities.js";
import LfgDeletionUtilities from "./lfg-deletion/lfg-deletion-utilities.js";

class LfgUtilities {
  public static extractRoleIds(text: string): Array<string> {
    return LfgCreationUtilities.extractRoleIds(text);
  }

  public static extractAdditionalInfo(text: string) {
    return LfgCreationUtilities.extractAdditionalInfo(text);
  }

  public static isLfgVoiceChannelEmpty(channel: VoiceChannel) {
    return LfgDeletionUtilities.isLfgVoiceChannelEmpty(channel);
  }

  public static isLfgTextChannelEmpty(channel: TextChannel) {
    return LfgDeletionUtilities.isLfgTextChannelEmpty(channel);
  }
}

export default LfgUtilities;
