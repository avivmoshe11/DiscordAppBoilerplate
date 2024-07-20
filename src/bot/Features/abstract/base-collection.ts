import * as mongodb from "mongodb";
import { BaseEntity, ChangeHandlers } from "./base-collection-definitions.js";
import mongoUtilities from "../../../Utilities/mongo-utilities.js";
import { ChangeStreamDocument } from "mongodb";
import mongoConsoleUtilities from "../../../Utilities/console/mongo-console-utilities.js";

abstract class BaseCollection<T extends BaseEntity> {
  public collectionName: string;
  protected changeHandlers: ChangeHandlers<T> = {};

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected setHandlers(handlers: ChangeHandlers<T>) {
    this.changeHandlers = handlers;

    if (mongoUtilities.isReplicaSet()) {
      this.setListener();
    }
  }

  private async setListener() {
    const collection = await this.getCollection();

    if (!collection) {
      this.collectionLog("Failed to set up a listener, collection is undefined.");
      return;
    }

    collection.watch().on("change", this.handleCollectionChange.bind(this));
    this.collectionLog(`[CHANGE] Listener set successfully with handlers: ${Object.keys(this.changeHandlers).join(", ")}`);
  }

  private async handleCollectionChange(change: ChangeStreamDocument<T>) {
    const handler = this.changeHandlers[change.operationType];

    if (handler) {
      await handler(change);
    } else {
      this.collectionLog(`Unhandled change operation: ${change.operationType}`);
    }
  }

  public getByQuery(query?: Record<string, any>, options?: mongodb.FindOptions<any>) {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      const filter = query ? query : {};
      return await collection.find(filter, options).toArray();
    });
  }

  public async getOneByQuery(query?: Record<string, any>, options?: mongodb.FindOptions<any>): Promise<T> {
    const response = await this.getByQuery(query, options);
    return response[0];
  }

  public async getAll(): Promise<T[]> {
    return this.getByQuery();
  }

  public async getById(id: string) {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      return await collection.findOne({ _id: new mongodb.ObjectId(id) });
    });
  }

  public insert(item: T) {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      item.createDate = new Date();
      item.updateDate = new Date();

      const response = await collection.insertOne(item);
      if (response.insertedId) return await this.getById(String(response.insertedId));
      return { error: "Invalid insertion." };
    });
  }

  public delete(id: string) {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      return await collection.deleteOne({ _id: new mongodb.ObjectId(id) });
    });
  }

  public deleteByQuery(query?: Record<string, any>) {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      return await collection.deleteOne(query);
    });
  }

  public clearCollection() {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      return await collection.deleteMany({});
    });
  }

  public update(filters: Record<string, any>, replacers: Record<string, any>) {
    return this.executeOnCollection(async (collection: mongodb.Collection) => {
      if (!replacers.updateDate) replacers.updateDate = new Date();
      const response = await collection.findOneAndUpdate(filters, { $set: replacers });
      if (response?.value) return await this.getById(String(response.value._id));
    });
  }

  public async getCollection() {
    return await mongoUtilities.getCollection(this.collectionName);
  }

  private async executeOnCollection(action: (collection: mongodb.Collection) => any) {
    const collection = await this.getCollection();
    if (!collection) return;
    return await action(collection);
  }

  public collectionLog(msg: string) {
    mongoConsoleUtilities.log(msg, "DATABASE", this.collectionName);
  }

  public collectionError(msg: string) {
    mongoConsoleUtilities.error(msg, "DATABASE", this.collectionName);
  }
}

export default BaseCollection;
