import { Client, VoiceChannel, VoiceState } from "discord.js";
import LfgUtilities from "../../Features/looking-for-game/lfg/lfg-utilities.js";
import lfgBl from "../../Features/looking-for-game/lfg/lfg-bl.js";

export default {
  name: "voiceStateUpdate",
  async execute(client: Client, oldState: VoiceState, newState: VoiceState) {
    const voiceChannel = oldState.channel as VoiceChannel;

    if (voiceChannel && LfgUtilities.isLfgVoiceChannelEmpty(voiceChannel)) {
      await lfgBl.destroyLfg(voiceChannel, oldState.guild);
    }
  }
};
