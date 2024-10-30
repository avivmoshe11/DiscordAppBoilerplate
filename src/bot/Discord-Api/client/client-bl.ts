import { ApplicationCommand, Client, Collection, GatewayIntentBits, Partials, Snowflake } from "discord.js";
import ClientUtilities from "./client-utilities.js";
import { CommandsCache } from "./client-definitions.js";
import commandsBl from "./application/commands/commands-bl.js";
import ClientApi from "./client-api.js";
import eventsBl from "./events/events-bl.js";
import CommandsUtilities from "./application/commands/commands-utilities.js";

class ClientBL {
  private client: Client;
  private commands: CommandsCache = {};

  constructor() {
    this.client = ClientUtilities.create(this.getIntents(), this.getPartials());
  }

  public async initialize() {
    const clientApi = new ClientApi(this.client);

    await clientApi.login(process.env.TOKEN);
    await eventsBl.loadEvents(this.client);
    await commandsBl.loadCommands(this.client);
  }

  public setCommandsCache(commands: CommandsCache) {
    this.commands = Object.assign({}, commands);
  }

  public updateCommandsCache(commandsCache: CommandsCache, response: Collection<Snowflake, ApplicationCommand<{}>>) {
    this.setCommandsCache(commandsCache);
    const commandNames = [];

    for (const [snowflake, command] of response) {
      this.commands[command.name] = { ...this.commands[command.name], id: snowflake };
      commandNames.push(command.name);
    }

    CommandsUtilities.logRegisteredCommands(commandNames);
  }

  private getIntents() {
    const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildScheduledEvents, GuildVoiceStates } = GatewayIntentBits;
    return [Guilds, GuildMembers, GuildMessages, MessageContent, GuildScheduledEvents, GuildVoiceStates];
  }

  private getPartials() {
    const { User, Message, GuildMember, ThreadMember } = Partials;
    return [User, Message, GuildMember, ThreadMember];
  }

  public getClient() {
    return this.client;
  }

  public getCommands() {
    return this.commands;
  }
}

export default new ClientBL();
