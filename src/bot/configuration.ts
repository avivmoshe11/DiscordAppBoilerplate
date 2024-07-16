const config = {
  common: {
    developer: {
      userName: "aviv1234",
      iconUrl: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg"
    },
    client: {
      name: "boilerplate"
    }
  },
  development: {
    mongo: {
      //url: "mongodb://127.0.0.1:27017"
      url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@phasmophobiaelite.8qlntcd.mongodb.net/`
    }
  },
  production: {}
};

const environment = process.env.ENV == "production" ? "production" : "development";
const selectedConfig = { ...config.common, ...config[environment] };

export default selectedConfig;
