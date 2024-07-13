import { Client, GatewayIntentBits, Partials, CommandInteraction } from "discord.js";
import fs from "fs";
import consoleUtilities from "./console-utilities.js";

class BotUtilities {
  private client: Client<boolean> | null = null;
  private commands: Record<string, (interaction: CommandInteraction, client: Client) => any> = {};

  public async initialize(): Promise<void> {
    const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildScheduledEvents, GuildVoiceStates } = GatewayIntentBits;
    const { User, Message, GuildMember, ThreadMember } = Partials;

    this.client = new Client({
      intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildScheduledEvents, GuildVoiceStates],
      partials: [User, Message, GuildMember, ThreadMember]
    });

    await this.client.login(process.env.TOKEN);
    await this.loadEvents();
    await this.loadCommands();
  }

  public getClient(): Client {
    return this.client as Client;
  }

  public getCommands(): Record<string, (interaction: CommandInteraction, client: Client) => any> {
    return this.commands;
  }

  private async loadCommands(): Promise<void> {
    const commandsArray = [];

    const commandsFolder = fs.readdirSync("./dist/src/discord/Commands");
    for (const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(`./dist/src/discord/Commands/${folder}`).filter((file) => file.endsWith("js"));
      for (const file of commandFiles) {
        const commandFile = await import(`../discord/Commands/${folder}/${file}`);
        this.commands[commandFile.default.data.name] = commandFile.default.execute;
        commandsArray.push(commandFile.default.data.toJSON());
        continue;
      }
    }

    this.client?.application?.commands.set(commandsArray);
  }

  private async loadEvents(): Promise<void> {
    const events: string[] = [];

    const folders = fs.readdirSync("./dist/src/discord/Events");
    for (const folder of folders) {
      const files = fs.readdirSync(`./dist/src/discord/Events/${folder}`).filter((file) => file.endsWith("js"));
      for (const file of files) {
        const event = await import(`../discord/Events/${folder}/${file}`);

        if (event.default.once) {
          this.client?.once(event.default.name, (...args: any[]) => {
            this.logTriggeredEvent(event.default.name);
            event.default.execute(...args, this.client);
          });
        } else {
          this.client?.on(event.default.name, (...args: any[]) => {
            this.logTriggeredEvent(event.default.name);
            event.default.execute(...args, this.client);
          });
        }

        events.push(event.default.name);
        continue;
      }
    }

    consoleUtilities.log(`Registered ${events.join(", ")} events.`, "DISCORD", "app-load-process");
  }

  public logTriggeredEvent(eventName: string) {
    consoleUtilities.log(`${eventName} event has been triggered.`, "DISCORD", "event");
  }

  public logTriggeredCommand(commandName: string) {
    consoleUtilities.log(`${commandName} command has been triggered.`, "DISCORD", "command");
  }
}

export default new BotUtilities();
