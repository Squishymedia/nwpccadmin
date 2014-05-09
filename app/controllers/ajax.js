var $ = require('jquery'),
    _ = require('underscore'),
    fs = require('fs'),
    async = require('async'),
    request = require('request');

exports.history = function(req, res){
  // Load revisions from data service, send as JSON.
  var url = global.conf.dataService + '/sets/' + req.param('sid') + global.conf.dataTail;
  
  try{request(url, function(error, response, body){
    
    console.log(body);
    
    var results = JSON.parse(body);
    
    console.log(results);
    
    res.render('history', {'data': results, 'service': global.conf.dataService, layout: null});
    
    
  });
  } catch (e) {
    if (global.conf.debug){console.log(e);}
    res.render('error',{'errormsg':e});
  }
}
  
  