import { Client } from "discord.js";

export type EventFileImport = {
  default: EventFileImportFields;
};

export type EventFileImportFields = {
  name: string;
  once?: boolean;
  execute: (client: Client, ...args: any[]) => any | Promise<any>;
};
