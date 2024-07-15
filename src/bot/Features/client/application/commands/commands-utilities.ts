import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { CommandFileImport } from "./commands-definitions.js";
import consoleUtilities from "../../../../../Utilities/console-utilities.js";

class CommandsUtilities {
  public static async getCommandFiles() {
    const files: Array<CommandFileImport> = [];
    const commandFolderPath = this.getCommandFolderPath();

    const commandsFolder = fs.readdirSync(commandFolderPath);
    for (const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(path.join(commandFolderPath, folder)).filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const commandFilePath = path.resolve(commandFolderPath, folder, file);
        const commandFileUrl = pathToFileURL(commandFilePath).href;
        const commandFile = await import(commandFileUrl);
        files.push(commandFile);
      }
    }

    return files;
  }

  private static getCommandFolderPath(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname, "../../../../Commands");
  }

  public static logRegisteredCommands(commandNames: Array<string>) {
    consoleUtilities.log(`Registered ${commandNames.join(", ")} commands.`, "BOT", "app-load-process");
  }

  public static logCommandTriggered(commandName: string) {
    consoleUtilities.log(`"${commandName}" command has been triggered.`, "BOT", "command");
  }
}

export default CommandsUtilities;
