import { ChangeStreamDocument, Document, ObjectId } from "mongodb";

export type BaseEntity = {
  _id?: ObjectId;
  createDate?: Date;
  updateDate?: Date;
};

export type ChangeHandlers<T extends Document> = Partial<Record<ChangeType, ChangeHandler<T>>>;

export type ChangeType = ChangeStreamDocument["operationType"];

export type ChangeHandler<T extends Document> = (change: ChangeStreamDocument<T>) => Promise<void> | void;
