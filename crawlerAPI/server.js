const express = require( "express" );
const cors = require( "cors" );

const app = express();
const port = process.env.PORT || "8081";
const router = express.Router();

app.use( cors() );

router.post( "/domains", ( req, res ) => {
  res.send( "yeah, it works" )
} ) // return all DB domains

app.use( "/", router );
app.listen( port, () => {
  console.log( `Server online at port: ${ port }` );
} )
