import { Client, Message, TextChannel } from "discord.js";
import LfgUtilities from "../../Features/looking-for-game/lfg/lfg-utilities.js";

export default {
  name: "messageDelete",
  async execute(client: Client, message: Message) {
    const channel = message.channel as TextChannel;

    if (await LfgUtilities.isLfgTextChannelEmpty(channel)) {
      await channel.delete();
    }
  }
};
