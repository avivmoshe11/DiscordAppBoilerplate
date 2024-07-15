import { Client } from "discord.js";
import EventsUtilities from "./events-utilities.js";

class EventsBL {
  public async loadEvents(client: Client) {
    const eventFiles = await EventsUtilities.getEventFiles();
    const events = [];

    for (const file of eventFiles) {
      if (file.default.once) {
        client.once(file.default.name, (...args: any[]) => {
          EventsUtilities.logEventTriggered(file.default.name);
          file.default.execute(client, ...args);
        });
      } else {
        client.on(file.default.name, (...args: any[]) => {
          EventsUtilities.logEventTriggered(file.default.name);
          file.default.execute(client, ...args);
        });
      }

      events.push(file.default.name);
    }

    EventsUtilities.logRegisteredEvents(events);
  }
}

export default new EventsBL();
