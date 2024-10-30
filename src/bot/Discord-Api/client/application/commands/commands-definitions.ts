import { SlashCommandBuilder } from "discord.js";

export type CommandFileImport = {
  default: CommandFileImportFields;
};

export type CommandFileImportFields = {
  data: SlashCommandBuilder;
  execute: () => any | Promise<any>;
};
