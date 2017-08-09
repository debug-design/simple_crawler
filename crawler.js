var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');


/*var pageToVisit = "http://www.arstechnica.com";
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
     console.log("Page title:  " + $('title').text());
   }
});
*/


var pageToVisit = "http://190.119.255.126/egasa/Formularios/Inicio.aspx";
var results = [];
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
     console.log("Page title:  " + $('title').text());

    $('#Centro table tbody tr').not( $('#Centro table tbody tr').first() ).each(function(i, elem) {
      results[i] = [];
      $(this).children('td').each(function(j, elem) {
        results[i][j] = $(this).text();
        console.log( $(this).text() );
      });
      console.log( '-------' );
    });
    console.log( results );
   }
});

