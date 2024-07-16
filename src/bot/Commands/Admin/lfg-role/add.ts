import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import LFGRolesUtilities from "../../../Features/looking-for-game/lfg-roles/lfg-roles-utilities.js";
import lfgRolesCollection from "../../../Features/looking-for-game/lfg-roles/lfg-roles-collection.js";

export async function addAction(client: Client, interaction: ChatInputCommandInteraction) {
  const role = interaction.options.getRole("role") as Role;
  const name = interaction.options.getString("name") as string;
  const lfgRole = LFGRolesUtilities.formatLFGRole(role, name);

  if (!LFGRolesUtilities.isRoleCached(lfgRole)) {
    await lfgRolesCollection.insert(lfgRole);
  } else {
    return `The role you tried adding already exists in the system, either by id or name, please insert different id or name.`;
  }

  return `Added role <@&${role.id}> to the LFG list!`;
}

export function addBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("add");
  subcommand.setDescription("Set a new LFG role.");
  subcommand.addRoleOption((role) => role.setName("role").setDescription("Role to add").setRequired(true));
  subcommand.addStringOption((name) => name.setName("name").setDescription("Name of the role").setRequired(true));

  return subcommand;
}
