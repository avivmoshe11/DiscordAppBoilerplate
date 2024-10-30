import { CategoryChannelResolvable, ChannelType, Guild, OverwriteResolvable, VoiceChannel } from "discord.js";
import ChannelsApi from "../channels-api.js";

class VoiceChannelsApi extends ChannelsApi {
  private channelType: typeof ChannelType.GuildVoice;

  constructor(guild: Guild) {
    super(guild);
    this.channelType = ChannelType.GuildVoice;
  }

  public async createVoiceChannel(name: string, parent: CategoryChannelResolvable, permissions: Array<OverwriteResolvable> = [], limit?: number, position?: number) {
    return this.createChannel<VoiceChannel>({ name, type: this.channelType, parent, permissionOverwrites: permissions, userLimit: limit, position });
  }
}

export default VoiceChannelsApi;
