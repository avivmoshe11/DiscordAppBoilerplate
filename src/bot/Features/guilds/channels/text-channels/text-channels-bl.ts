import { TextChannel } from "discord.js";

class TextChannelsBL {
  public async isChannelEmpty(channel: TextChannel) {
    const messages = await channel.messages.fetch();

    return messages.size === 0;
  }
}

export default new TextChannelsBL();
