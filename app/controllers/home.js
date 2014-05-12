var $ = require('jquery'),
    _ = require('underscore'),
    fs = require('fs'),
    async = require('async'),
    request = require('request'),
    moment = require('moment');

function readJSONFile(filename, callback) {
  console.log('Attempting to read "' + filename + '"');
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

exports.show = function(req, res){

  var url = global.conf.dataService + '/sets' + global.conf.dataTail;
  
  try{request(url, function(error, response, body){

  console.log(body);
  
  var sets = JSON.parse(body);
  
  console.log(sets);
  
    res.render('index', {'sets': sets, 'global': {'service': global.conf.dataService}});

  });
  } catch (e) {
      if(global.conf.debug){console.log(e);}
      res.render('error', {'errormsg':e});
  }
  
}


exports.getData = function(req, urlTail, callback) {
  var url = global.conf.dataService + '/' + urlTail;

  request(url, function(error, response, xml){
    if (error) {
      callback(error, null);
    }
    else {
      try {
        parseString(xml, function (err, result) {
          callback(null, result);
        });
      }
      catch(e) {
        callback(e, null);
      }
    }
  });
};

exports.search = function(req, res){
  var key = req.query['term'].toLowerCase(),
      results = searchApp.search(key);

  var searchResults = [];

  if(req.param('which') == 'schools'){
    _.each(results, function(a){
      if(schoolNames[a] != null){searchResults.push(schoolNames[a]);};
    });
  }else if(req.param('which') == 'districts'){
    _.each(results, function(a){
      if(districtNames[a] != null){searchResults.push(districtNames[a]);};
    });
  }

  res.send(searchResults);
};