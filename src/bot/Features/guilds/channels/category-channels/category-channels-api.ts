import { ChannelType, Guild, OverwriteResolvable } from "discord.js";
import ChannelsAPI from "../channels-api";

class CategoryChannelsApi extends ChannelsAPI {
  constructor(guild: Guild) {
    super(guild);
  }

  public async createTextChannel(name: string, permissions: Array<OverwriteResolvable> = []) {
    return this.createChannel({ name, type: ChannelType.GuildCategory, permissionOverwrites: permissions });
  }
}

export default CategoryChannelsApi;
