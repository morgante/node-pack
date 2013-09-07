var express     = require('express'),
	http        = require('http'),
	mongoose    = require('mongoose'),
	request     = require('request');

var pkg         = require('./package.json'),
    Sample      = require('./models/sample');

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

app.get('/followers', function(req, res) {
    var username = req.query.username;
    
    Sample.findOne({"username": req.query.username}, function(err, user) {
        if (user == undefined) {
            request("https://api.github.com/users/" + username, function(error, response, body) {
                body = JSON.parse(body);
                Sample.create({
                    "username": username,
                    "followers": body.followers
                }, function(err, user) {
                    res.send(user.toJSON());
                });
            });
        } else {
            res.send(user.toJSON());
        }
    });

});


// start listening
app.listen( process.env.PORT , function() {
  console.log('Express server listening on port ' + process.env.PORT);
});