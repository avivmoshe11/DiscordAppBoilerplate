import { ChangeStreamDeleteDocument, ChangeStreamDocument, ChangeStreamInsertDocument, ChangeStreamUpdateDocument, ObjectId } from "mongodb";
import BaseCollection from "../../abstract/base-collection.js";
import { ChangeHandlers } from "../../abstract/base-collection-definitions.js";
import mongoConsoleUtilities from "../../../../Utilities/console/mongo-console-utilities.js";
import { Snowflake } from "discord.js";
import { LfgPost, LfgPostEntity } from "./lfg-definitions.js";

class LfgPostsCollection extends BaseCollection<LfgPostEntity> {
  private cache: Array<LfgPostEntity> = [];

  constructor() {
    super("lfg-posts");

    super.setHandlers(this.getHandlers());
    this.initiateCache();
  }

  /********************************************
   ** User actions to handle posts collection *
   *******************************************/

  public async insetPost(post: LfgPost) {
    return this.insert(post);
  }

  public async editPost(id: string, ...args: Partial<LfgPost>[]) {
    return this.update({ requestId: id }, Object.assign({}, ...args));
  }

  public async deletePost(id: string) {
    return this.deleteByQuery({ id });
  }

  public async deletePostByObjectId(_id: ObjectId) {
    return this.delete(_id.toString());
  }

  public getCache() {
    return this.cache;
  }

  public getCachePostsByUser(id: Snowflake) {
    return this.cache.filter((post) => post.userId === id);
  }

  public getCachePostsByChannel(id: Snowflake) {
    return this.cache.filter((post) => post.channelId === id);
  }

  public getCachePostsByLfgRole(id: Snowflake) {
    return this.cache.filter((post) => post.lfgRole.id === id);
  }

  private isEntryValid(post: LfgPostEntity) {
    return post.userId && post.channelId && post.lfgRole && post.complementaryRoles;
  }

  /********************************************
   ** Automated actions to handle posts cache *
   ********************************************/

  public async initiateCache() {
    this.log("Initiating Lfg Posts cache...");

    try {
      const postsFromDb = await this.getAll();
      this.cache = postsFromDb
        .filter((post) => this.isEntryValid(post))
        .map(({ userId, channelId, lfgRole, complementaryRoles, requestId, voiceChannelId }) => ({
          userId,
          channelId,
          lfgRole,
          complementaryRoles,
          requestId,
          voiceChannelId
        }));

      this.log("Cache initiated successfully");
    } catch {
      this.log("Cache initiation process failed, check DB connection.");
    }
  }

  private getHandlers(): ChangeHandlers<LfgPostEntity> {
    return {
      insert: this.handleInsert.bind(this),
      update: this.handleUpdate.bind(this),
      delete: this.handleDelete.bind(this)
    };
  }

  private handleInsert(change: ChangeStreamDocument<LfgPostEntity>) {
    const insertChange = change as ChangeStreamInsertDocument<LfgPostEntity>;
    const post = insertChange.fullDocument;
    this.cache.push({ ...post });
    this.log(`Inserted post for role: ${post.lfgRole.name}`);
  }

  private handleUpdate(change: ChangeStreamDocument<LfgPostEntity>) {
    const updateChange = change as ChangeStreamUpdateDocument<LfgPostEntity>;
    const updatedFields = updateChange.updateDescription.updatedFields;
    const _id = updateChange.documentKey._id;
    const index = this.cache.findIndex((post) => post._id?.toString() === _id.toString());

    if (index !== -1) {
      this.cache[index] = { ...this.cache[index], ...updatedFields };
      this.log(`Updated post for role: ${this.cache[index].lfgRole.name}`);
    }
  }

  private handleDelete(change: ChangeStreamDocument<LfgPostEntity>) {
    const deleteChange = change as ChangeStreamDeleteDocument<LfgPostEntity>;
    const _id = deleteChange.documentKey._id;
    this.cache = this.cache.filter((post) => post._id?.toString() !== _id.toString());
    this.log(`Deleted post: ${_id.toString()}`);
  }

  private log(msg: string) {
    mongoConsoleUtilities.log(msg, "LFG-POSTS", "Cache");
  }
}

export default new LfgPostsCollection();
