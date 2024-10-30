import { Client } from "discord.js";

class ClientApi {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async login(token: string) {
    await this.client.login(token);
  }
}

export default ClientApi;
