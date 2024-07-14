import { BaseFetchOptions, Guild, RoleCreateOptions, RoleManager } from "discord.js";
import GuildsAPI from "../guilds-api";

class RolesApi extends GuildsAPI {
  protected rolesManager: RoleManager;

  constructor(guild: Guild) {
    super(guild);
    this.rolesManager = this.guild.roles;
  }

  public async getRoleById(id: string, options?: BaseFetchOptions) {
    return this.rolesManager.fetch(id, options);
  }

  public async createRole(options: RoleCreateOptions) {
    return this.rolesManager.create(options);
  }
}

export default RolesApi;
