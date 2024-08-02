import { VoiceChannel } from "discord.js";
import voiceChannelsBl from "./voice-channels-bl.js";

class VoiceChannelsUtilities {
  public static isChannelEmpty(channel: VoiceChannel) {
    return voiceChannelsBl.isChannelEmpty(channel);
  }
}

export default VoiceChannelsUtilities;
