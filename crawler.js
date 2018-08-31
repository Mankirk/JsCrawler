const request = require("request");
const cheerio = require("cheerio");

const getSiteData = (error, response, body) => {
  const $ = cheerio.load(body);

  const links = $("a");

  links.each((index, link) => {
    console.log(link.attribs.href);
  });
};

request("https://www.mediafax.ro", getSiteData);
