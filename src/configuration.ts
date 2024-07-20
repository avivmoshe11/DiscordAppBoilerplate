import assignDeep from "assign-deep";
import appConsoleUtilities from "./Utilities/console/app-console-utilities.js";

const appName = "PhasmophobiaElite";

const config = {
  common: {
    appName: appName,
    mongo: {
      scheme: appName
    }
  },
  development: {
    mongo: {
      url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@phasmophobiaelite.8qlntcd.mongodb.net/`
    }
  },
  production: {}
};

const environment = process.env.ENV == "production" ? "production" : "development";
appConsoleUtilities.log(`Using ${environment} environment.`, "APP-LOADER", "environment");

const selectedConfig: typeof config.common & typeof config.production & typeof config.development = assignDeep(config.common, config[environment]);

export default selectedConfig;
