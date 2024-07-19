import { Role, Snowflake } from "discord.js";
import { ExcludedRole } from "./excluded-roles-definitions";
import lfgRolesCollection from "./excluded-roles-collection.js";

class ExcludedRolesUtilities {
  public static formatExcludedRole(role: Role | Snowflake): ExcludedRole {
    return role instanceof Role ? { id: role.id } : { id: role };
  }

  public static isRoleCached({ id }: ExcludedRole) {
    return lfgRolesCollection.getCache().some((role) => role.id === id);
  }
}

export default ExcludedRolesUtilities;
