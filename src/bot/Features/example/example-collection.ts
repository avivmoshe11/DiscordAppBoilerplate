import { ChangeStreamDeleteDocument, ChangeStreamDocument, ChangeStreamInsertDocument, ChangeStreamUpdateDocument, ObjectId } from "mongodb";
import BaseCollection from "../abstract/base-collection.js";
import { Example, ExampleEntity } from "./example-definitions.js";
import { ChangeHandlers } from "../abstract/base-collection-definitions.js";
import { mongoConsole } from "../../../Utilities/console/index.js";

class ExampleCollection extends BaseCollection<ExampleEntity> {
  constructor() {
    super("example");
    super.setHandlers(this.getHandlers());
  }

  /********************************************
   ** User actions to handle roles collection *
   *******************************************/

  public async insetRole(role: Example) {
    return this.insert(role);
  }

  public async editRole(id: string, ...args: Partial<Example>[]) {
    return this.update({ id }, Object.assign({}, ...args));
  }

  public async deleteRole(id: string) {
    return this.deleteByQuery({ id });
  }

  public async deleteRoleByObjectId(_id: ObjectId) {
    return this.delete(_id.toString());
  }

  /********************************************
   *** Automated actions to handle changes ****
   ********************************************/

  private getHandlers(): ChangeHandlers<ExampleEntity> {
    return {
      insert: this.handleInsert.bind(this),
      update: this.handleUpdate.bind(this),
      delete: this.handleDelete.bind(this)
    };
  }

  private handleInsert(change: ChangeStreamDocument<ExampleEntity>) {
    const insertChange = change as ChangeStreamInsertDocument<ExampleEntity>;
    this.log(`Inserted document: ${insertChange.fullDocument}`);
  }

  private handleUpdate(change: ChangeStreamDocument<ExampleEntity>) {
    const updateChange = change as ChangeStreamUpdateDocument<ExampleEntity>;
    this.log(`Updated document: ${updateChange.fullDocument}`);
  }

  private handleDelete(change: ChangeStreamDocument<ExampleEntity>) {
    const deleteChange = change as ChangeStreamDeleteDocument<ExampleEntity>;
    const _id = deleteChange.documentKey._id;
    this.log(`Deleted document: ${_id.toString()}`);
  }

  private log(msg: string) {
    mongoConsole.log(msg, this.collectionName);
  }
}

export default new ExampleCollection();
