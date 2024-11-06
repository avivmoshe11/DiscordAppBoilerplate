import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { EventFileImport } from "./events-definitions.js";
import { botConsole } from "../../../../Utilities/console/index.js";

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
    botConsole.error(`"${eventName}" event has crashed.`, "event");
  }

  public static logRegisteredEvents(eventNames: Array<string>) {
    botConsole.log(`Registered ${eventNames.join(", ")} events.`, "app-load-process");
  }

  public static logEventTriggered(eventName: string) {
    botConsole.log(`${eventName} event has been triggered.`, "event");
  }
}

export default EventsUtilities;
