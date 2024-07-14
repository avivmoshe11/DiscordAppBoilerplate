import * as mongodb from "mongodb";
import configuration from "../configuration.js";
import consoleUtilities from "./console-utilities.js";

class MongoUtilities {
  private _db: mongodb.Db | null = null;
  private _client: mongodb.MongoClient | null = null;
  private initializing = false;
  private initialized = false;

  public connectToDB() {
    return new Promise(async (resolve, reject) => {
      this.databaseLog("Connecting to DB...");
      this.initializing = true;

      const dbName = `${configuration.mongo.scheme}-${process.env.NODE_ENV}`;
      const urlWithSchema = this.addSchemaToUrl(configuration.mongo.url as string, dbName);
      const mongoClient = new mongodb.MongoClient(urlWithSchema);

      try {
        const client = await mongoClient.connect();

        this._client = client;
        this._db = this._client.db(dbName);
        this.databaseLog(`Connected to DB ${dbName}`);

        this.initializing = false;
        this.initialized = true;
        resolve(this._db);
      } catch (err) {
        this.databaseError(`Failed to connect to DB. rejecting ${err}`);
        this.initializing = false;
        reject(err);
      }
    });
  }

  public addSchemaToUrl(url: string, schema: string) {
    return `${url}/${schema}-${process.env.NODE_ENV}`;
  }

  public getClient() {
    return this._client;
  }

  public getDB() {
    return this._db;
  }

  public async getCollection(collectionName: string) {
    await this.ensureConnection();
    return this._db?.collection(collectionName);
  }

  public async ensureConnection() {
    if (!this.initialized) {
      await this.connectToDB();
    }
  }

  public isIdValid(id: any) {
    return (typeof id === "string" && (id.length === 12 || /^[\da-f]{24}$/i.test(id))) || (typeof id === "number" && Number.isInteger(id));
  }

  private databaseLog(msg: string) {
    consoleUtilities.log(msg, "DATABASE", "app-load-process");
  }

  private databaseError(msg: string) {
    consoleUtilities.error(msg, "DATABASE", "app-load-process");
  }
}

export default new MongoUtilities();
