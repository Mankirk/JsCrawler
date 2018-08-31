const request = require("request");
const cheerio = require("cheerio");


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


const allLinks = [];
let iterations = 0;
const limit = 10;

const getSiteData = ( error, response, body ) => {
    if( error ) {
      return
    }

    iterations ++;
    if( iterations > limit ) {
      console.log( "Final", allLinks );
      return
    }

    const $ = cheerio.load( body );
    const links = $( "a" );

    const linkList = [];
    links.each( ( index, link ) => {
      linkList.push( link.attribs.href );
    } )

    const finalLinks = extractStandaloneDomains( linkList )
    console.log( "---BATCH---", finalLinks );
    allLinks.push( ...finalLinks );

    finalLinks.unshift()
    finalLinks.forEach( ( link ) => {
      request( link, getSiteData );
    }  )
}

const startCrawler = ( error, response, body ) => {
    getSiteData( error, response, body );
}

request( "http://www.prosport.ro", startCrawler )
