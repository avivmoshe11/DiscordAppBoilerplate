const config = {
  common: {
    developer: {
      userName: "",
      iconUrl: ""
    },
    client: {
      name: "",
      tag: "",
      id: ""
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
const selectedConfig = { ...config.common, ...config[environment] };

export default selectedConfig;
