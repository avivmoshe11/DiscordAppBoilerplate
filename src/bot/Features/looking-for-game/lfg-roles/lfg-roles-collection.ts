import { ChangeStreamDeleteDocument, ChangeStreamDocument, ChangeStreamInsertDocument, ChangeStreamUpdateDocument, ObjectId } from "mongodb";
import BaseCollection from "../../abstract/base-collection.js";
import { LfgRole, LfgRoleEntity } from "./lfg-roles-definitions.js";
import { ChangeHandlers } from "../../abstract/base-collection-definitions.js";
import mongoConsoleUtilities from "../../../../Utilities/console/mongo-console-utilities.js";
import { Snowflake } from "discord.js";

class LfgRolesCollection extends BaseCollection<LfgRoleEntity> {
  private cache: Array<LfgRoleEntity> = [];

  constructor() {
    super("lfg-roles");

    super.setHandlers(this.getHandlers());
    this.initiateCache();
  }

  /********************************************
   ** User actions to handle roles collection *
   *******************************************/

  public async insetRole(role: LfgRole) {
    return this.insert(role);
  }

  public async editRole(id: string, ...args: Partial<LfgRole>[]) {
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

  public getCacheById(id: Snowflake) {
    return this.cache.find((role) => role.id === id) as LfgRole;
  }

  /********************************************
   ** Automated actions to handle roles cache *
   ********************************************/

  public async initiateCache() {
    this.log("Initiating Lfg Roles cache...");

    try {
      const rolesFromDb = await this.getAll();
      this.cache = rolesFromDb.filter((role) => role.id && role.name).map((role) => ({ name: role.name, id: role.id }));

      this.log("Cache initiated successfully");
    } catch {
      this.log("Cache initiation process failed, check DB connection.");
    }
  }

  private getHandlers(): ChangeHandlers<LfgRoleEntity> {
    return {
      insert: this.handleInsert.bind(this),
      update: this.handleUpdate.bind(this),
      delete: this.handleDelete.bind(this)
    };
  }

  private handleInsert(change: ChangeStreamDocument<LfgRoleEntity>) {
    const insertChange = change as ChangeStreamInsertDocument<LfgRoleEntity>;
    const role = insertChange.fullDocument;
    this.cache.push({ _id: role._id, name: role.name, id: role.id });
    this.log(`Inserted role: ${role.name}`);
  }

  private handleUpdate(change: ChangeStreamDocument<LfgRoleEntity>) {
    const updateChange = change as ChangeStreamUpdateDocument<LfgRoleEntity>;
    const updatedFields = updateChange.updateDescription.updatedFields;
    const _id = updateChange.documentKey._id;
    const index = this.cache.findIndex((role) => role._id?.toString() === _id.toString());

    if (index !== -1) {
      this.cache[index] = { ...this.cache[index], ...updatedFields };
      this.log(`Updated role: ${this.cache[index].name}`);
    }
  }

  private handleDelete(change: ChangeStreamDocument<LfgRoleEntity>) {
    const deleteChange = change as ChangeStreamDeleteDocument<LfgRoleEntity>;
    const _id = deleteChange.documentKey._id;
    this.cache = this.cache.filter((role) => role._id?.toString() !== _id.toString());
    this.log(`Deleted role: ${_id.toString()}`);
  }

  private log(msg: string) {
    mongoConsoleUtilities.log(msg, "LFG-ROLES", "Cache");
  }
}

export default new LfgRolesCollection();
