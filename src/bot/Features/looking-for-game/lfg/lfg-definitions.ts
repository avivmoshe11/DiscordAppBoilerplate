import { Snowflake } from "discord.js";
import { LFGRole } from "../lfg-roles/lfg-roles-definitions";

export type LFGPost = {
  userId: Snowflake;
  lfgRoles: Array<LFGRole>;
  complementaryRoles: Array<Snowflake>;
};
