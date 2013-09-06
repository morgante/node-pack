var express     = require('express')
	, http      = require('http')
	, mongoose  = require('mongoose')

var pkg         = require('./package.json')

// set up Mongoose
mongoose.connect('localhost', pkg.name);
var db = mongoose.connection;
db.once('open', function callback() {
  console.log('Connected to DB');
});

var app = express();
// configure Express
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.engine('ejs', require('ejs-locals'));

	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: process.env.SECRET }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// set up routes
app.get('/', function(req, res) {
    res.render("index", {
        project: pkg.name
    });
});

// start listening
app.listen( process.env.PORT , function() {
  console.log('Express server listening on port ' + process.env.PORT);
});