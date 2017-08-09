var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var http = require('http');


function requestEgasa(callback) {
  var pageToVisit = "http://190.119.255.126/egasa/Formularios/Inicio.aspx";
  var data = [];
  var res = {};
  console.log("Visiting page " + pageToVisit);
  request(pageToVisit, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if(response.statusCode === 200) {
      // Parse the document body
      var $ = cheerio.load(body);
      $('#Centro table tbody tr').not( $('#Centro table tbody tr').first() ).each(function(i, elem) {
        data[i] = [];
        $(this).children('td').each(function(j, elem) {
          data[i][j] = $(this).text();
        });
      });
      res ['data'] = data;
      callback(res);
    }
  });
}

http.createServer(function(req, res){

  //console.log(req.url);
  if( req.url == '/' ) {
    requestEgasa(function(data){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      res.end();
    });
  } else {
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end('404 error');
  }

}).listen(9090);
console.log ("server on port 9090");