import { Snowflake } from "discord.js";
import { BaseEntity } from "../../../abstract/base-collection-definitions.js";
import { ObjectId } from "mongodb";

export type ExcludedRole = {
  _id?: ObjectId;
  id: string | Snowflake;
};

export type ExcludedRoleEntity = ExcludedRole & BaseEntity;
