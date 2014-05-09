/**
 * App constants.
 */

//require('newrelic');

/**
 * Module dependencies.
 */

global.conf = require(__dirname + '/config/config.js');

var express = require('express'),
    hbs = require('express-hbs'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    _ = require('underscore'),
    app = express();

  /**
   * Helper functions
   */

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function titleCase(txt) {
    //return txt.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  /**
   * Handlebars Helper functions
   */

  if (typeof hbs !== 'undefined') {

    hbs.registerHelper('debug', function(obj) {
      console.log(obj);
    });

    hbs.registerHelper('timestamp', function(obj){
      // Return a sane version of the timestamp passed in the data set.
    });

  }//if typeof hbs


  /**
   * Engine business
   */

app.engine('hbs', hbs.express3({
  contentHelperName: 'content',
  defaultLayout: __dirname + '/app/views/layouts/main.hbs',
  layoutsDir: __dirname + '/app/views/layouts'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/views');

app.set('port', process.env.PORT || global.conf.runPort);

app.configure(function() {
  app.use('/public', express.static(__dirname + '/public'));
});

app.use(express.cookieParser());

// Conditionally set up session handler with redis or memory store

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./config/routes')(app);

// 404 handler.
//
// This assumes anything not handled by another middleware is a 404, which
// should be a pretty good assumption.
app.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('error', {'errormsg': "Sorry, we couldn't find that page."});
  }
  else if (req.accepts('json')) {
    res.send({ error: 'Not found' });
  }
  else {
    res.type('txt').send('Not found');
  }
});

try {
  var server = http.createServer(app).listen(global.conf.runPort, function(){
    console.log('Express server listening on port ' + global.conf.runPort);
  });
} catch(e) {
  console.log(e);
}

