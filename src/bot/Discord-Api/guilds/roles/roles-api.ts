import { BaseFetchOptions, Guild, RoleCreateOptions, RoleManager } from "discord.js";
import GuildsApi from "../guilds-api.js";

class RolesApi extends GuildsApi {
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
