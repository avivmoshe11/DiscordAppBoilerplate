import { Role, Snowflake } from "discord.js";
import { LfgRole } from "./lfg-roles-definitions.js";
import lfgRolesCollection from "./lfg-roles-collection.js";

class LfgRolesUtilities {
  public static formatLfgRole(role: Role | Snowflake, name: string): LfgRole {
    return role instanceof Role ? { id: role.id, name } : { id: role, name };
  }

  public static isRoleCached({ id, name }: LfgRole) {
    return lfgRolesCollection.getCache().some((role) => role.id === id || role.name === name);
  }

  public static isLfgName(name: string) {
    return lfgRolesCollection
      .getLfgRolesNames()
      .map((r) => r.toLowerCase())
      .some((n) => n === name);
  }
}

export default LfgRolesUtilities;
