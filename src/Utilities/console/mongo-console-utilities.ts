import ConsoleUtilities from "./console-utilities.js";

class MongoConsoleUtilities extends ConsoleUtilities {
  constructor() {
    super("magenta");
  }
}

export default new MongoConsoleUtilities();
