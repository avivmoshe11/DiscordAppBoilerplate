import { Snowflake } from "discord.js";
import { BaseEntity } from "../../abstract/base-collection-definitions.js";

export type LfgRole = {
  id: string | Snowflake;
  name: string;
};

export type LfgRoleEntity = LfgRole & BaseEntity;
