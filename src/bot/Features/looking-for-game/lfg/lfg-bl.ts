import { ChatInputCommandInteraction, Guild, VoiceChannel } from "discord.js";
import lfgCreationBl from "./lfg-creation/lfg-creation-bl.js";
import lfgDeletionBl from "./lfg-deletion/lfg-deletion-bl.js";

class LfgBL {
  public async createLfg(interaction: ChatInputCommandInteraction, roleIds: Array<string>, info: string, strict: boolean) {
    return lfgCreationBl.createLfg(interaction, roleIds, info, strict);
  }

  public async destroyLfg(input: VoiceChannel | string, guild: Guild) {
    if (input instanceof VoiceChannel) {
      await lfgDeletionBl.removeLfgByVoiceChannel(input, guild);
    } else if (typeof input === "string") {
      await lfgDeletionBl.removeLfgByRequest(input, guild);
    }
  }
}

export default new LfgBL();
