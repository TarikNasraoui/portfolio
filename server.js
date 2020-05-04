var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport')

const http = require('http');
//Models
require('./model/user');
require('./model/profile');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');

//Configs
require('./config/connection');


var app = express();



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/profile', profileRouter);


// Passport MiddleWare
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.end(err);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;