import chalk from "chalk";
import generalUtilities from "../general-utilities.js";
import { chalkColor } from "./console-definitions.js";

abstract class ConsoleUtilities {
  private logColor: chalkColor;
  private successColor: chalkColor;
  private errorColor: chalkColor;

  constructor(log: chalkColor = "blueBright", success: chalkColor = "greenBright", error: chalkColor = "red") {
    this.logColor = log;
    this.successColor = success;
    this.errorColor = error;
  }

  public log(msg: string, topic = "", subTopic = "") {
    console.log(chalk[this.logColor](this.getPrefix(topic, subTopic) + msg));
  }

  public success(msg: string, topic = "", subTopic = "") {
    console.log(chalk[this.successColor](this.getPrefix(topic, subTopic) + msg));
  }

  public error(msg: string, topic = "", subTopic = "") {
    console.error(chalk[this.errorColor](this.getPrefix(topic, subTopic) + msg));
  }

  public boldLog(msg: string, topic = "", subTopic = "") {
    console.log(chalk.bgMagentaBright(chalk.bold(chalk.green(this.getPrefix(topic, subTopic) + msg + " "))));
  }

  private getPrefix(topic: string, subTopic: string) {
    if (topic) {
      topic = `{${topic}}`;
    }

    return `${generalUtilities.getTimeStamp()} | ${topic ? `${topic} ` : ""}${subTopic ? `(${subTopic}) ` : ""}`;
  }
}

export default ConsoleUtilities;
