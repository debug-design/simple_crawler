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

var _inputs = {
  'Charcani5': {
    'url': 'http://190.119.255.126/egasa/Formularios/Charcani5.aspx',
    'inputs': {
      '__EVENTTARGET': '__EVENTTARGET',
      '__EVENTARGUMENT': '__EVENTARGUMENT',
      '__VIEWSTATE': '__VIEWSTATE',
      '__EVENTVALIDATION': '__EVENTVALIDATION',
      'ctl00$TextBoxUsuario': 'ctl00$TextBoxUsuario',
      'ctl00$TextBoxClave': 'ctl00$TextBoxClave',
      'ctl00$RadioButtonList1': 'ctl00$RadioButtonList1',
      'grupo1': 'ctl00$ContentPlaceHolder1$BTN_DescG1',
    }
  }
};

function requestHistorico(callback) {
  var pageToVisit = "Charcani5";
  var grupo = "grupo1";
  var data = [];
  var res = {};
  request( _inputs[pageToVisit]['url'], function(error, response, body) {
    if(error)
      console.log("Error: " + error);
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    //console.log(body);
    // obtener datos del formulario
    if(response.statusCode === 200) {
      // Parse the document body
      var $ = cheerio.load(body);

      var EVENTTARGET = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTTARGET']+'"]').val() || "" );
      var EVENTARGUMENT = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTARGUMENT']+'"]').val() || "" );
      var VIEWSTATE = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__VIEWSTATE']+'"]').val() || "" );
      var EVENTVALIDATION = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTVALIDATION']+'"]').val() || "" );
      var ctl00TextBoxUsuario = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario']+'"]').val() || "" );
      var ctl00TextBoxClave = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave']+'"]').val() || "" );
      var ctl00RadioButtonList1 = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1']+'"]').val() || "" );
      var ctl00ContentGrupo = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs'][grupo]+'"]').val() || "" );

      // seleccionamos fecha
      var date = new Date("08/18/2017");
      var dateBase = new Date("07/30/2017");
      var dateBaseNum = 6420;
      var timeDiff = date.getTime() - dateBase.getTime();
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      var date = dateBaseNum + diffDays;
      console.log( date );

      EVENTTARGET = encodeURIComponent('ctl00$Calendar1');
      EVENTARGUMENT = date.toString();

      var request_body = encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTTARGET'])+'='+EVENTTARGET+'&'+
        encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTARGUMENT'])+'='+EVENTARGUMENT+'&'+
        encodeURIComponent(_inputs[pageToVisit]['inputs']['__VIEWSTATE'])+'='+VIEWSTATE+'&'+
        encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTVALIDATION'])+'='+EVENTVALIDATION+'&'+
        encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario'])+'='+ctl00TextBoxUsuario+'&'+
        encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave'])+'='+ctl00TextBoxClave+'&'+
        encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1'])+'='+'BD2';
      console.log(request_body)
      
      console.log( 'actualizando a fecha' );
      request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     _inputs[pageToVisit]['url'],
        body:    request_body
      }, function(error, response, body){

        if(error)
          console.log("Error: " + error);
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        // obtener datos del formulario
        if(response.statusCode === 200) {
          var $ = cheerio.load(body);

          var EVENTTARGET = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTTARGET']+'"]').val() || "" );
          var EVENTARGUMENT = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTARGUMENT']+'"]').val() || "" );
          var VIEWSTATE = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__VIEWSTATE']+'"]').val() || "" );
          var EVENTVALIDATION = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTVALIDATION']+'"]').val() || "" );
          var ctl00TextBoxUsuario = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario']+'"]').val() || "" );
          var ctl00TextBoxClave = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave']+'"]').val() || "" );
          var ctl00RadioButtonList1 = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1']+'"]').val() || "" );
          var ctl00ContentGrupo = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs'][grupo]+'"]').val() || "" );

          var request_body = encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTTARGET'])+'='+EVENTTARGET+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTARGUMENT'])+'='+EVENTARGUMENT+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs']['__VIEWSTATE'])+'='+VIEWSTATE+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTVALIDATION'])+'='+EVENTVALIDATION+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario'])+'='+ctl00TextBoxUsuario+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave'])+'='+ctl00TextBoxClave+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1'])+'='+'BD2'+'&'+
            encodeURIComponent(_inputs[pageToVisit]['inputs'][grupo])+'='+ctl00ContentGrupo;
          console.log(request_body)

          console.log( 'obteniendo csv' );
          request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     _inputs[pageToVisit]['url'],
            body:    request_body
          }, function(error, response, body){

            console.log( '--' );
            console.log(body);

          });

        }
      });

      
      
      
      /*$('#Centro table tbody tr').not( $('#Centro table tbody tr').first() ).each(function(i, elem) {
        data[i] = [];
        $(this).children('td').each(function(j, elem) {
          data[i][j] = $(this).text();
        });
      });
      res ['data'] = data;
      callback(res);*/
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
  } else if( req.url == '/historico' ) {
    requestHistorico(function(data){
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