const Datastore = require("nedb");
const request = require("request");
const cheerio = require("cheerio");
const crawler = require( "../crawler/crawler" );

const db = {};
const config = {
  dataDir: "../data",
  dbDir: "/db"
};

db.domains = new Datastore({
  filename: `${config.dataDir + config.dbDir}/domains.db`,
  autoload: true
});



db.domains.ensureIndex( { fieldName: "domain" } );

module.exports = ( req, res ) => {
    const initialDomain = req.body.initialDomain;

    const removeDuplicates = ( urls ) => {

        const uniqueUrls = [];
        urls.forEach( url => {

          if( uniqueUrls.indexOf( url ) === -1 ) {
            uniqueUrls.push( url );
          }
        } )

        return uniqueUrls
    }

    const extractBaseURLs = ( urls ) => {
        const baseURLS = urls.map( url => {
          const split = url.split( "." )

          const domainEnd = split[ 2 ] ? split[ 2 ].slice( 0, 2 ): "";

          if( ( split[ 0 ] !== "http://www" && split[ 0 ] !== "https://www" )|| domainEnd !== "ro" ) {
            return "BADURL";
          }

          const single = [ split[ 0 ], split[ 1 ], domainEnd ];
          return single.join( "." );
        } ).filter( ( url ) => url !== "BADURL" );

        return removeDuplicates( baseURLS );
    }

    const extractStandaloneDomains = ( linkList ) => {

      const standaloneDomains = linkList.filter( ( link ) => {
        const re = new RegExp("^(http|https)://", "i");
        const isStandaloneDomain = re.test(link);
        return isStandaloneDomain;
      } )

      return extractBaseURLs( standaloneDomains );
    }

    const getSiteData = ( error, response, body ) => {

        if( error ) {
          return res.send( "SOME ERR" )
        }

        const $ = cheerio.load( body );
        const links = $( "a" );

        const linkList = [];
        links.each( ( index, link ) => {
          linkList.push( link.attribs.href );
        } )
        const finalLinks = extractStandaloneDomains( linkList )

        return res.send( { domains: finalLinks } )
    }

    request( initialDomain, getSiteData )
}

