let express = require('express');
let app = express();
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let $log = require('log4js').getLogger('index');
let silent = 'test' == process.env.NODE_ENV;

// Controllers
let site = require('./controllers/site');

module.exports = app;

// Config
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// our custom "verbose errors" setting
// which we can use in the templates
// via settings['verbose errors']
app.enable('verbose errors');

// disable them in production
// use $ NODE_ENV=production node examples/error-pages
if ('production' == app.settings.env) app.disable('verbose errors');

silent || app.use(logger('dev'));

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// General
app.get('/', site.index);


// Error Handling

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  $log.error(err);
  let status = err.status || 500;
  let message = err.message;
  let stack = {};
  // development error handler will print stacktrace
  if (app.get('env') === 'development') {
    stack = err.stack;
  }
  res.status(status);
  res.render('error', {
    status: status,
    message: message,
    stack: stack
  });
});
