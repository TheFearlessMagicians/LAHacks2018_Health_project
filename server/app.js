//The Smooth Jazz
let express = require('express');
let app = express();
let router = require('express-router');

//Variables and Constants
const port = 8000;

//Models
Contract = require('./models/contract');

//BodyParser set up
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//Mongoose set up
mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/LAHacks");

//Express Router
app.use(require("./routes/contract"));
app.get("/", (req,res) => {
	res.json({
		"message": "Welcome to the cleanest API ever"
	})
});

//Server
let server = app.listen(port, function() {
    console.log('Listening on port ' + port);
    console.log('Serving on local host');
});
app.set('isLocal', true);
