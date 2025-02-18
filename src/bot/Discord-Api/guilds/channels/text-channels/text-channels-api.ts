import { CategoryChannelResolvable, ChannelType, Guild, OverwriteResolvable, TextChannel } from "discord.js";
import ChannelsApi from "../channels-api.js";

class TextChannelsApi extends ChannelsApi {
  private channelType: typeof ChannelType.GuildText;

  constructor(guild: Guild) {
    super(guild);
    this.channelType = ChannelType.GuildText;
  }

  public async createTextChannel(name: string, parent: CategoryChannelResolvable, permissions: Array<OverwriteResolvable> = []) {
    return this.createChannel<TextChannel>({ name, type: this.channelType, parent, permissionOverwrites: permissions });
  }
}

export default TextChannelsApi;
