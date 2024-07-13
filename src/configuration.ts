import assignDeep from "assign-deep";
import consoleUtilities from "./Utilities/console-utilities.js";

const appName = "boilerplate";

const config = {
  common: {
    appName: appName,
    mongo: {
      scheme: appName
    }
  },
  development: {
    mongo: {
      url: "mongodb://127.0.0.1:27017"
    }
  },
  production: {}
};

const environment = process.env.ENV == "production" ? "production" : "development";
consoleUtilities.log(`Using ${environment} environment.`, "APP-LOADER", "environment");

const selectedConfig: typeof config.common & typeof config.production & typeof config.development = assignDeep(config.common, config[environment]);

export default selectedConfig;
