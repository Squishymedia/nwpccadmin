var $ = require('jquery'),
    _ = require('underscore'),
    fs = require('fs'),
    async = require('async'),
    request = require('request'),
    moment = require('moment');
    
exports.history = function(req, res){
  // Load revisions from data service, send as JSON.
  var url = global.conf.dataService + '/sets/' + req.param('sid') + global.conf.dataTail;
  
  try{request(url, function(error, response, body){
    
    console.log(body);
    
    var results = JSON.parse(body);
    
    _.each(results.revisions, function(a){
      if (a.id == results.current_revision) {
        a.current = true;
      }
      a.created = moment(a.created).format('MMMM Do h:mm a');
      
    });
    
    console.log(results);
    
    
    res.render('history', {'data': results, 'service': global.conf.dataService, layout: null});
    
    });
  } catch (e) {
    if (global.conf.debug){console.log(e);}
    res.render('error',{'errormsg':e});
  }
}
  
  
exports.postnew = function(req, res){
  // Load a POST form to upload a new sheet.
  
  var sid = req.param('sid');
  console.log(sid);
  
  var url = global.conf.dataService + '/sets/' + req.param('sid') + global.conf.dataTail;
  
  try{request(url, function(error, response, body){
    
    console.log(body);
    
    var results = JSON.parse(body);
    
    console.log(results);
  
    res.render('postnew', {'setid': sid, 'title': results.title, 'service': global.conf.dataService, layout: null});

    });
  } catch (e) {
    if (global.conf.debug){console.log(e);}
    res.render('error',{'errormsg':e});
  }
}
  
  
exports.approve = function(req, res){
  
  var url = global.conf.dataService + '/sets/' + req.param('sid') + '/' + req.param('vid') + '/approve';
   
  try{request.post(url, function(error, response, body){
  
    results = JSON.parse(body);
  
    res.render('message', {'message': results.message, layout: null});
   
  });
  } catch (e) {
      if(global.conf.debug){console.log(e);}
      res.render('error', {'errormsg':e});
  }
  
}