import { BaseFetchOptions, GuildChannelCreateOptions, GuildChannelEditOptions, SetChannelPositionOptions } from "discord.js"; // interface
import { Snowflake, GuildChannelResolvable } from "discord.js"; // type
import { Guild, GuildChannelManager } from "discord.js"; // class
import GuildsAPI from "../guilds-api";

class ChannelsAPI extends GuildsAPI {
  protected channelManager: GuildChannelManager;

  constructor(guild: Guild) {
    super(guild);
    this.channelManager = this.guild.channels;
  }

  public async getChannelById(id: string, options?: BaseFetchOptions) {
    return this.channelManager.fetch(id as Snowflake, options);
  }

  protected async createChannel(options: GuildChannelCreateOptions) {
    return this.channelManager.create(options);
  }

  public async deleteChannel(channel: GuildChannelResolvable, reason?: string) {
    return this.channelManager.delete(channel, reason);
  }

  public async editChannel(channel: GuildChannelResolvable, options: GuildChannelEditOptions) {
    return this.channelManager.edit(channel, options);
  }

  public async setChannelPosition(channel: GuildChannelResolvable, position: number, options?: SetChannelPositionOptions) {
    return this.channelManager.setPosition(channel, position, options);
  }
}

export default ChannelsAPI;