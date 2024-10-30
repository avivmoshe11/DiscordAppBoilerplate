import { Guild, TextChannel, VoiceChannel } from "discord.js";
import lfgCollection from "../lfg-collection.js";
import { LfgPostEntity } from "../lfg-definitions.js";
import TextChannelsApi from "../../../../Discord-Api/guilds/channels/text-channels/text-channels-api.js";
import botConsoleUtilities from "../../../../../Utilities/console/bot-console-utilities.js";
import { ObjectId } from "mongodb";

class LfgDeletionBL {
  public async removeLfgByVoiceChannel(voiceChannel: VoiceChannel, guild: Guild) {
    const lfgPosts = lfgCollection.getCachePostsByVoiceChannel(voiceChannel.id);

    for (const post of lfgPosts) {
      try {
        await this.removePost(post, guild);
        await lfgCollection.deletePostByObjectId(post._id as ObjectId);
      } catch (err) {
        this.log(`Error deleting post for ${post.lfgRole.name} type, request: ${post.requestId}.\n${err}`);
      }
    }

    await voiceChannel.delete();
  }

  public async removeLfgByRequest(requestId: string, guild: Guild) {}

  private async removePost(lfgPostEntity: LfgPostEntity, guild: Guild) {
    const textChannelsApi = new TextChannelsApi(guild);
    const channel = await textChannelsApi.getChannelById<TextChannel>(lfgPostEntity.channelId);

    if (channel) {
      const message = await channel.messages.fetch(lfgPostEntity.messageId);

      if (message) {
        await message.delete();
      }
    }
  }

  public async lfgRemovalJob() {}

  private log(msg: string) {
    botConsoleUtilities.error(msg, "LFG", "lfg-deletion-process");
  }
}

export default new LfgDeletionBL();
