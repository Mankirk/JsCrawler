const Datastore = require("nedb");

const db = {};

const config = {
  dataDir: "data",
  dbDir: "/db"
};

db.domains = new Datastore({
  filename: `${config.dataDir + config.dbDir}/domains.db`,
  autoload: true
});

db.domains.ensureIndex({ fieldName: "domain" });

var crawlerController = require("./crawlerController.js")(config, db);
