import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { EventFileImport } from "./events-definitions.js";
import botConsoleUtilities from "../../../../Utilities/console/bot-console-utilities.js";

class EventsUtilities {
  public static async getEventFiles() {
    const files: Array<EventFileImport> = [];
    const eventFolderPath = this.getEventsFolderPath();

    const eventsFolder = fs.readdirSync(eventFolderPath);
    for (const folder of eventsFolder) {
      const eventFiles = fs.readdirSync(path.join(eventFolderPath, folder)).filter((file) => file.endsWith(".js"));
      for (const file of eventFiles) {
        const eventFilePath = path.resolve(eventFolderPath, folder, file);
        const eventFileUrl = pathToFileURL(eventFilePath).href;
        const eventFile = await import(eventFileUrl);
        files.push(eventFile);
      }
    }

    return files;
  }

  private static getEventsFolderPath(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname, "../../../Events");
  }

  public static logCrashedCommand(eventName: string) {
    botConsoleUtilities.error(`"${eventName}" event has crashed.`, "BOT", "event");
  }

  public static logRegisteredEvents(eventNames: Array<string>) {
    botConsoleUtilities.log(`Registered ${eventNames.join(", ")} events.`, "BOT", "app-load-process");
  }

  public static logEventTriggered(eventName: string) {
    botConsoleUtilities.log(`${eventName} event has been triggered.`, "BOT", "event");
  }
}

export default EventsUtilities;
