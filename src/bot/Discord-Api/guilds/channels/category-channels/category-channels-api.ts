import { CategoryChannel, ChannelType, Guild, OverwriteResolvable } from "discord.js";
import ChannelsApi from "../channels-api.js";

class CategoryChannelsApi extends ChannelsApi {
  private channelType: typeof ChannelType.GuildCategory;

  constructor(guild: Guild) {
    super(guild);
    this.channelType = ChannelType.GuildCategory;
  }

  public async createCategoryChannel(name: string, permissions: Array<OverwriteResolvable> = []) {
    return this.createChannel<CategoryChannel>({ name, type: this.channelType, permissionOverwrites: permissions });
  }
}

export default CategoryChannelsApi;
