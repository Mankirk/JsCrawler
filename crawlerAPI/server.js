const express = require( "express" );
const cors = require( "cors" );
const bodyParser = require( "body-parser" );

const app = express();
const port = process.env.PORT || "8081";
const router = express.Router();


const domainGetters = require( "./controllers/getDomains" );

app.use(cors());


app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

router.post( "/domains", domainGetters )

app.use("/", router);
app.listen(port, () => {
  console.log(`Server online at port: ${port}`);
});
