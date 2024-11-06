import ConsoleUtilities from "./console-utilities";

const botConsole = new ConsoleUtilities("bot");
const serverConsole = new ConsoleUtilities("server");
const mongoConsole = new ConsoleUtilities("mongo");

export { botConsole, serverConsole, mongoConsole };
