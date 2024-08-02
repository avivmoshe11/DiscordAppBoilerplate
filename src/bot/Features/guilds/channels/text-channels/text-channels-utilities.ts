import { TextChannel } from "discord.js";
import textChannelsBl from "./text-channels-bl.js";

class TextChannelsUtilities {
  public static isChannelEmpty(channel: TextChannel) {
    return textChannelsBl.isChannelEmpty(channel);
  }
}

export default TextChannelsUtilities;
