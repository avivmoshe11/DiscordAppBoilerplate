import { ChangeStreamDeleteDocument, ChangeStreamDocument, ChangeStreamInsertDocument, ChangeStreamUpdateDocument } from "mongodb";
import consoleUtilities from "../../../../Utilities/console-utilities.js";
import BaseCollection from "../../abstract/base-collection.js";
import { LFGRole, LFGRoleEntity } from "./lfg-roles-definitions.js";

class LFGRolesCollection extends BaseCollection<LFGRoleEntity> {
  public rolesCache: Array<LFGRole> = [];

  constructor() {
    super("lfg-roles");

    this.initiateRolesCache();
    this.setListener();
  }

  /********************************************
   ** User actions to handle roles collection *
   *******************************************/

  public async insetRole(role: LFGRole) {
    return this.insert(role);
  }

  public async editRole(id: string, ...args: Partial<LFGRole>[]) {
    return this.update({ id }, Object.assign({}, ...args));
  }

  /********************************************
   ** Automated actions to handle roles cache *
   ********************************************/

  public async initiateRolesCache() {
    this.log("Initiating LFG Roles cache...");

    try {
      const rolesFromDb = await this.getAll();
      this.rolesCache = rolesFromDb.filter((role) => role.id && role.name).map((role) => ({ name: role.name, id: role.id }));

      this.log("Cache initiated successfully");
    } catch {
      this.log("Cache initiation process failed, check DB connection.");
    }
  }

  private async setListener() {
    const collection = await this.getCollection();

    if (!collection) {
      this.log("Failed to set up a listener, collection is undefined.");
      return;
    }

    collection.watch().on("change", this.handleCollectionChange.bind(this));
    this.log(`Listener set successfully for "${collection.collectionName}" collection`);
  }

  private handleCollectionChange(change: ChangeStreamDocument<LFGRoleEntity>) {
    switch (change.operationType) {
      case "insert":
        this.handleInsert(change as ChangeStreamInsertDocument<LFGRoleEntity>);
        break;

      case "update":
        this.handleUpdate(change as ChangeStreamUpdateDocument<LFGRoleEntity>);
        break;

      case "delete":
        this.handleDelete(change as ChangeStreamDeleteDocument<LFGRoleEntity>);
        break;

      default:
        this.log(`Unhandled change operation: ${change.operationType}`);
    }
  }

  private handleInsert(change: ChangeStreamInsertDocument<LFGRoleEntity>) {
    const role = change.fullDocument;
    this.rolesCache.push({ _id: role._id, name: role.name, id: role.id });
    this.log(`Inserted role: ${role.name}`);
  }

  private handleUpdate(change: ChangeStreamUpdateDocument<LFGRoleEntity>) {
    const updatedFields = change.updateDescription.updatedFields;
    const _id = change.documentKey._id;
    const index = this.rolesCache.findIndex((role) => role._id?.toString() === _id.toString());

    if (index !== -1) {
      this.rolesCache[index] = { ...this.rolesCache[index], ...updatedFields };
      this.log(`Updated role: ${this.rolesCache[index].name}`);
    }
  }

  private handleDelete(change: ChangeStreamDeleteDocument<LFGRoleEntity>) {
    const _id = change.documentKey._id;
    this.rolesCache = this.rolesCache.filter((role) => role._id?.toString() !== _id.toString());
    this.log(`Deleted role: ${_id.toString()}`);
  }

  private log(msg: string) {
    consoleUtilities.log(msg, "LFG-ROLES", "Cache");
  }
}

export default LFGRolesCollection;
