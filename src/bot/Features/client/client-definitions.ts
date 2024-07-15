import { CommandInteraction, Client, Snowflake } from "discord.js";

export type CommandsCache = Record<string, CommandsCacheCommand>;

export type CommandsCacheCommand = {
  action: (client: Client, interaction: CommandInteraction) => any;
  id: Snowflake;
};
