import { ChangeStreamDeleteDocument, ChangeStreamDocument, ChangeStreamInsertDocument, ChangeStreamUpdateDocument, ObjectId } from "mongodb";
import BaseCollection from "../../abstract/base-collection.js";
import { ExcludedRole, ExcludedRoleEntity } from "./excluded-roles-definitions.js";
import { ChangeHandlers } from "../../abstract/base-collection-definitions.js";
import mongoConsoleUtilities from "../../../../Utilities/console/mongo-console-utilities.js";

class ExcludedRolesCollection extends BaseCollection<ExcludedRoleEntity> {
  private cache: Array<ExcludedRole> = [];

  constructor() {
    super("excluded-roles");

    super.setHandlers(this.getHandlers());
    this.initiateCache();
  }

  /********************************************
   ** User actions to handle roles collection *
   *******************************************/

  public async insetRole(role: ExcludedRole) {
    return this.insert(role);
  }

  public async editRole(id: string, ...args: Partial<ExcludedRole>[]) {
    return this.update({ id }, Object.assign({}, ...args));
  }

  public async deleteRole(id: string) {
    return this.deleteByQuery({ id });
  }

  public async deleteRoleByObjectId(_id: ObjectId) {
    return this.delete(_id.toString());
  }

  public getCache() {
    return this.cache;
  }

  /********************************************
   ** Automated actions to handle roles cache *
   ********************************************/

  public async initiateCache() {
    this.log("Initiating Excluded Roles cache...");

    try {
      const rolesFromDb = await this.getAll();
      this.cache = rolesFromDb.filter((role) => role.id).map((role) => ({ id: role.id }));

      this.log("Cache initiated successfully");
    } catch {
      this.log("Cache initiation process failed, check DB connection.");
    }
  }

  private getHandlers(): ChangeHandlers<ExcludedRoleEntity> {
    return {
      insert: this.handleInsert.bind(this),
      update: this.handleUpdate.bind(this),
      delete: this.handleDelete.bind(this)
    };
  }

  private handleInsert(change: ChangeStreamDocument<ExcludedRoleEntity>) {
    const insertChange = change as ChangeStreamInsertDocument<ExcludedRoleEntity>;
    const role = insertChange.fullDocument;
    this.cache.push({ _id: role._id, id: role.id });
    this.log(`Inserted role: ${role.id}`);
  }

  private handleUpdate(change: ChangeStreamDocument<ExcludedRoleEntity>) {
    const updateChange = change as ChangeStreamUpdateDocument<ExcludedRoleEntity>;
    const updatedFields = updateChange.updateDescription.updatedFields;
    const _id = updateChange.documentKey._id;
    const index = this.cache.findIndex((role) => role._id?.toString() === _id.toString());

    if (index !== -1) {
      this.cache[index] = { ...this.cache[index], ...updatedFields };
      this.log(`Updated role: ${this.cache[index].id}`);
    }
  }

  private handleDelete(change: ChangeStreamDocument<ExcludedRoleEntity>) {
    const deleteChange = change as ChangeStreamDeleteDocument<ExcludedRoleEntity>;
    const _id = deleteChange.documentKey._id;
    this.cache = this.cache.filter((role) => role._id?.toString() !== _id.toString());
    this.log(`Deleted role: ${_id.toString()}`);
  }

  private log(msg: string) {
    mongoConsoleUtilities.log(msg, "EXCLUDED-ROLES", "Cache");
  }
}

export default new ExcludedRolesCollection();
