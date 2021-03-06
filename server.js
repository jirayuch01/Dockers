var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var hbs = require('hbs');
var morgan = require('morgan');
var fs = require('fs');
var db = mongoose.connection;

//mongoose.connect('mongodb://localhost/forAuth');
mongoose.connect('mongodb://Beerkurai1412:nanoha1412@ds113046.mlab.com:13046/smsservice', {useMongoClient: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { });

hbs.registerPartials(__dirname + '/views/partials')

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('dev'));

app.use(express.static(__dirname + '/templateLogReg'));
app.use('/fetchdata/', express.static(__dirname + '/templateLogReg'));
app.use('/send/', express.static(__dirname + '/templateLogReg'));

var routes = require('./routes/router');
app.use('/', routes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Server app listening on port 8080');
});