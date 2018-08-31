module.exports = function(config, db) {
  const request = require("request");
  const cheerio = require("cheerio");
  const _ = require("lodash");

  const getSiteData = (error, response, body) => {
    if (!body) {
      return;
    }
    const $ = cheerio.load(body);
    const links = $("a");
    const domains = [];

    links.each((index, link) => {
      if (link.attribs.href && link.attribs.href.indexOf("http") >= 0) {
        const splitted = link.attribs.href.split("/");
        const protocol = splitted[0];
        const domain = splitted[2];
        const domainComponents = domain.split(".");
        const tld = domainComponents[domainComponents.length - 1];

        if (tld === "ro" && protocol.indexOf("http") >= 0) {
          domains.push(`${protocol}//${domain}`);
        }
      }
    });

    const uniqueDomains = _.uniq(domains);

    for (var i = 0; i <= uniqueDomains.length; i++) {
      // crawl(uniqueDomains[i]);
      // db.domains.insert({ domain: uniqueDomains[i] }, function(err, newDoc) {
      //   if (err) {
      //     console.log("err");
      //     console.log(err);
      //   }
      //   console.log("newDoc");
      //   console.log(newDoc);
      // });
    }

    db.domains.find({}, function(err, docs) {
      console.log(docs);
    });
  };

  function crawl(url) {
    if (!url) {
      return;
    }

    request(url, getSiteData);
  }

  crawl("https://www.mediafax.ro");
};
