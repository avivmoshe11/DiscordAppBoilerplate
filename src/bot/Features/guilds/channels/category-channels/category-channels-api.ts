import { CategoryChannel, ChannelType, Guild, OverwriteResolvable } from "discord.js";
import ChannelsAPI from "../channels-api";

class CategoryChannelsApi extends ChannelsAPI {
  constructor(guild: Guild) {
    super(guild);
  }

  public async createCategoryChannel(name: string, permissions: Array<OverwriteResolvable> = []) {
    return this.createChannel<CategoryChannel>({ name, type: ChannelType.GuildCategory, permissionOverwrites: permissions });
  }
}

export default CategoryChannelsApi;
