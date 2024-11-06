import { Snowflake } from "discord.js";
import { BaseEntity } from "../abstract/base-collection-definitions.js";

export type Example = {
  id: string | Snowflake;
  name: string;
};

export type ExampleEntity = Example & BaseEntity;
