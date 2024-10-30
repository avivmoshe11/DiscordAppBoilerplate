import { VoiceChannel } from "discord.js";

class VoiceChannelsBL {
  public isChannelEmpty(channel: VoiceChannel) {
    return channel.members.size === 0;
  }
}

export default new VoiceChannelsBL();
