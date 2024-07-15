import { Client, ClientApplication } from "discord.js";
import ClientApi from "../client-api.js";

class ApplicationApi extends ClientApi {
  protected clientApplication: ClientApplication;

  constructor(client: Client) {
    super(client);
    this.clientApplication = client.application as ClientApplication;
  }
}

export default ApplicationApi;
