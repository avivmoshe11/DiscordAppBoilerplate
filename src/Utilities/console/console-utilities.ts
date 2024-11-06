import chalk from "chalk";
import generalUtilities from "../general-utilities.js";
import { chalkColor, ConsoleColors, ConsoleTypes } from "./console-definitions.js";

class ConsoleUtilities {
  private logColor: chalkColor;
  private successColor: chalkColor;
  private errorColor: chalkColor;
  private defaultTopic: string;

  constructor(consoleType: ConsoleTypes) {
    this.logColor = ConsoleColors[consoleType];
    this.successColor = "greenBright";
    this.errorColor = "red";
    this.defaultTopic = consoleType.toUpperCase();
  }

  public log(msg: string, subTopic = "", topic = this.defaultTopic) {
    console.log(chalk[this.logColor](this.getPrefix(topic, subTopic) + msg));
  }

  public success(msg: string, subTopic = "", topic = this.defaultTopic) {
    console.log(chalk[this.successColor](this.getPrefix(topic, subTopic) + msg));
  }

  public error(msg: string, subTopic = "", topic = this.defaultTopic) {
    console.error(chalk[this.errorColor](this.getPrefix(topic, subTopic) + msg));
  }

  public boldLog(msg: string, subTopic = "", topic = this.defaultTopic) {
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
