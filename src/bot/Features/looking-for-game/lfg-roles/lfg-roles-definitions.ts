import { Snowflake } from "discord.js";
import { BaseEntity } from "../../abstract/base-collection-definitions.js";
import { ObjectId } from "mongodb";

export type LFGRole = {
  _id?: ObjectId;
  id: string | Snowflake;
  name: string;
};

export type LFGRoleEntity = LFGRole & BaseEntity;
