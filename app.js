var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var jobs = require('./routes/jobs');
var instances = require('./routes/instances');
var snow = require('./routes/snow');
var auth = require('./routes/auth');
var stripe = require('./routes/stripe');

var app = express();

require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({allowedHeaders: ['Authorization', 'Content-Type'], origin: true}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(function(req, res, next){
  var token = req.get('Authorization');
  if(token){
    token = token.substring(7);
    console.log(token);
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded){
      if(err){
        // Hits this if it couldn't be verified.
        console.error('err', err);
        next();
      } else {
        console.log(decoded);
        req.user = decoded;
        next()
      }
    });
  } else {
    // No token Found
    console.error('no token found')
    next()
  }
})

app.use('/', routes);
app.use('/users', users);
app.use('/jobs', jobs);
app.use('/instances', instances);
app.use('/snow', snow);
app.use('/auth', auth);
app.use('/stripe', stripe);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
