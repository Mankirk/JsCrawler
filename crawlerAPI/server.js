const express = require( "express" );
const cors = require( "cors" );

const app = express();
const port = process.env.PORT || "8081";
const router = express.Router();

const getDomains = require( "./controllers/getDomains" );

app.use( cors() );

router.post( "/domains", getDomains ) // return all DB domains

app.use( "/", router );
app.listen( port, () => {
  console.log( `Server online at port: ${ port }` );
} )
