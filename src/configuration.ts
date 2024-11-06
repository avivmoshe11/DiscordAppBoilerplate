import assignDeep from "assign-deep";
import { serverConsole } from "./Utilities/console/index.js";

const appName = "DiscordAppBoilerplate";

const config = {
  common: {
    appName: appName,
    mongo: {
      scheme: appName
    }
  },
  development: {
    mongo: {
      url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}`
    }
  },
  production: {}
};

const environment = process.env.ENV == "production" ? "production" : "development";
serverConsole.log(`Using ${environment} environment.`, "APP-LOADER", "environment");

const selectedConfig: typeof config.common & typeof config.production & typeof config.development = assignDeep(config.common, config[environment]);

export default selectedConfig;
