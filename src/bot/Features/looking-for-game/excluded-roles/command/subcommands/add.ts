import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import excludedRolesCollection from "../../excluded-roles-collection.js";
import ExcludedRolesUtilities from "../../excluded-roles-utilities.js";

export async function addAction(client: Client, interaction: ChatInputCommandInteraction) {
  const role = interaction.options.getRole("role") as Role;
  const excludedRole = ExcludedRolesUtilities.formatExcludedRole(role);

  if (!ExcludedRolesUtilities.isRoleCached(excludedRole)) {
    await excludedRolesCollection.insert(excludedRole);
  } else {
    return `The role you tried adding already exists in the system, either by id or name, please insert different id or name.`;
  }

  return `Added role <@&${role.id}> to the Excluded list!`;
}

export function addBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("add");
  subcommand.setDescription("Set a new excluded role.");
  subcommand.addRoleOption((role) => role.setName("role").setDescription("Role to add").setRequired(true));

  return subcommand;
}
