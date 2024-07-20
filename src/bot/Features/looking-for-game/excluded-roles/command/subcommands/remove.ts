import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import excludedRolesCollection from "../../excluded-roles-collection.js";

export async function removeAction(client: Client, interaction: ChatInputCommandInteraction) {
  const role = interaction.options.getRole("role") as Role;
  const cachedRole = excludedRolesCollection.getCache().find((excludedRole) => excludedRole.id === role.id);

  if (cachedRole) {
    await excludedRolesCollection.deleteRole(cachedRole.id);
  } else {
    return `Role <@&${role.id}> is not a excluded role.`;
  }

  return `Role <@&${role.id}> was deleted successfully!`;
}

export function removeBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("remove");
  subcommand.setDescription("Remove a excluded role.");
  subcommand.addRoleOption((role) => role.setName("role").setDescription("Role to remove").setRequired(true));

  return subcommand;
}
