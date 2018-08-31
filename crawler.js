const request = require( "request" );
const cheerio  = require( "cheerio" );


const extractStandaloneDomains = ( linkList ) => {

  const standaloneDomains = linkList.filter( ( link ) => {
    const re = new RegExp("^(http|https)://", "i");
    const isStandaloneDomain = re.test(link);
    return isStandaloneDomain
  } )

  return standaloneDomains;
}


const getSiteData = ( error, response, body ) => {
    const $ = cheerio.load( body );

    const links = $( "a" );

    const linkList = [];
    links.each( ( index, link ) => {
      linkList.push( link.attribs.href );
    } )

    console.log( extractStandaloneDomains( linkList ) );

}

request( "https://www.mediafax.ro", getSiteData )
