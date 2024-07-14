import { ChannelType, Guild, OverwriteResolvable, TextChannel } from "discord.js";
import ChannelsAPI from "../channels-api";

class TextChannelsApi extends ChannelsAPI {
  constructor(guild: Guild) {
    super(guild);
  }

  public async createTextChannel(name: string, permissions: Array<OverwriteResolvable> = []) {
    return this.createChannel<TextChannel>({ name, type: ChannelType.GuildText, permissionOverwrites: permissions });
  }
}

export default TextChannelsApi;
