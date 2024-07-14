import { ObjectId } from "mongodb";

export type BaseEntity = {
  _id?: ObjectId;
  createDate?: Date;
  updateDate?: Date;
};
