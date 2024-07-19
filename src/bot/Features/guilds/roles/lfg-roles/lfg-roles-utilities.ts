import { Role, Snowflake } from "discord.js";
import { LFGRole } from "./lfg-roles-definitions.js";
import lfgRolesCollection from "./lfg-roles-collection.js";

class LFGRolesUtilities {
  public static formatLFGRole(role: Role | Snowflake, name: string): LFGRole {
    return role instanceof Role ? { id: role.id, name } : { id: role, name };
  }

  public static isRoleCached({ id, name }: LFGRole) {
    return lfgRolesCollection.getCache().some((role) => role.id === id || role.name === name);
  }
}

export default LFGRolesUtilities;
