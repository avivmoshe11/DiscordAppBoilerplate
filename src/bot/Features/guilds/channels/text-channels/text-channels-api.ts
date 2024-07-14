import { ChannelType, Guild, OverwriteResolvable } from "discord.js";
import ChannelsAPI from "../channels-api";

class TextChannelsApi extends ChannelsAPI {
  constructor(guild: Guild) {
    super(guild);
  }

  public async createTextChannel(name: string, permissions: Array<OverwriteResolvable> = []) {
    return this.createChannel({ name, type: ChannelType.GuildText, permissionOverwrites: permissions });
  }
}

export default TextChannelsApi;
