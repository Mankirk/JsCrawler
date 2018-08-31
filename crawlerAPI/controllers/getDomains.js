const Datastore = require("nedb");

const db = {};
const config = {
  dataDir: "../data",
  dbDir: "/db"
};

db.domains = new Datastore({
  filename: `${config.dataDir + config.dbDir}/domains.db`,
  autoload: true
});

db.domains.ensureIndex({ fieldName: "domain" });

module.exports = (req, res) => {
  db.domains.find({}, (err, docs) => {
    console.log("docs", docs);
    if (err) {
      res.send("SOMETHING WENT WRONG ");
    }
    return res.send({ domains: docs });
  });
};
