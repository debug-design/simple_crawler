var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var http = require('http');
const moment = require('moment-timezone');


function requestEgasa(callback) {
  var pageToVisit = "http://190.119.255.126/egasa/Formularios/Inicio.aspx";
  var data = [];
  var res = {};
  //console.log("Visiting page " + pageToVisit);
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
    } else {
      callback(false);
    }
  });
}

var _inputs = {
  'Charcani1': {
    'url': 'http://190.119.255.126/egasa/Formularios/Charcani1.aspx',
    'inputs': {
      '__EVENTTARGET': '__EVENTTARGET',
      '__EVENTARGUMENT': '__EVENTARGUMENT',
      '__VIEWSTATE': '__VIEWSTATE',
      '__EVENTVALIDATION': '__EVENTVALIDATION',
      'ctl00$TextBoxUsuario': 'ctl00$TextBoxUsuario',
      'ctl00$TextBoxClave': 'ctl00$TextBoxClave',
      'ctl00$RadioButtonList1': 'ctl00$RadioButtonList1',
      'grupo1': 'ctl00$ContentPlaceHolder1$Btn_DescG1',
      'grupo2': 'ctl00$ContentPlaceHolder1$Btn_DescG2',
    }
  },
  'Charcani2': {
    'url': 'http://190.119.255.126/egasa/Formularios/Charcani2.aspx',
    'inputs': {
      '__EVENTTARGET': '__EVENTTARGET',
      '__EVENTARGUMENT': '__EVENTARGUMENT',
      '__VIEWSTATE': '__VIEWSTATE',
      '__EVENTVALIDATION': '__EVENTVALIDATION',
      'ctl00$TextBoxUsuario': 'ctl00$TextBoxUsuario',
      'ctl00$TextBoxClave': 'ctl00$TextBoxClave',
      'ctl00$RadioButtonList1': 'ctl00$RadioButtonList1',
      'grupo1': 'ctl00$ContentPlaceHolder1$Btn_DescG1',
      'grupo2': 'ctl00$ContentPlaceHolder1$Btn_DescG2',
      'grupo3': 'ctl00$ContentPlaceHolder1$Btn_DescG3',
    }
  },
  'Charcani3': {
    'url': 'http://190.119.255.126/egasa/Formularios/Charcani3.aspx',
    'inputs': {
      '__EVENTTARGET': '__EVENTTARGET',
      '__EVENTARGUMENT': '__EVENTARGUMENT',
      '__VIEWSTATE': '__VIEWSTATE',
      '__EVENTVALIDATION': '__EVENTVALIDATION',
      'ctl00$TextBoxUsuario': 'ctl00$TextBoxUsuario',
      'ctl00$TextBoxClave': 'ctl00$TextBoxClave',
      'ctl00$RadioButtonList1': 'ctl00$RadioButtonList1',
      'grupo1': 'ctl00$ContentPlaceHolder1$Btn_DescG1',
      'grupo2': 'ctl00$ContentPlaceHolder1$Btn_DescG2',
    }
  },
  'Charcani4': {
    'url': 'http://190.119.255.126/egasa/Formularios/Charcani4.aspx',
    'inputs': {
      '__EVENTTARGET': '__EVENTTARGET',
      '__EVENTARGUMENT': '__EVENTARGUMENT',
      '__VIEWSTATE': '__VIEWSTATE',
      '__EVENTVALIDATION': '__EVENTVALIDATION',
      'ctl00$TextBoxUsuario': 'ctl00$TextBoxUsuario',
      'ctl00$TextBoxClave': 'ctl00$TextBoxClave',
      'ctl00$RadioButtonList1': 'ctl00$RadioButtonList1',
      'grupo1': 'ctl00$ContentPlaceHolder1$Btn_DescG1',
      'grupo2': 'ctl00$ContentPlaceHolder1$Btn_DescG2',
      'grupo3': 'ctl00$ContentPlaceHolder1$Btn_DescG3',
    }
  },
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
      'grupo2': 'ctl00$ContentPlaceHolder1$BTN_DescG2',
      'grupo3': 'ctl00$ContentPlaceHolder1$BTN_DescG3',
    }
  },
  'Charcani6': {
    'url': 'http://190.119.255.126/egasa/Formularios/Charcani6.aspx',
    'inputs': {
      '__EVENTTARGET': '__EVENTTARGET',
      '__EVENTARGUMENT': '__EVENTARGUMENT',
      '__VIEWSTATE': '__VIEWSTATE',
      '__EVENTVALIDATION': '__EVENTVALIDATION',
      'ctl00$TextBoxUsuario': 'ctl00$TextBoxUsuario',
      'ctl00$TextBoxClave': 'ctl00$TextBoxClave',
      'ctl00$RadioButtonList1': 'ctl00$RadioButtonList1',
      'grupo1': 'ctl00$ContentPlaceHolder1$Btn_DescG1',
    }
  },
};

function dateToNumber(fecha) {
  var dateBase = new Date("07/30/2017");
  var dateBaseNum = 6420;
  var timeDiff = fecha.getTime() - dateBase.getTime();
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  return dateBaseNum + diffDays;
}

function limaTimeToUTC(dateString) {
  //return moment.tz(dateString, 'DD-MM-YYYY HH:mm:ss', 'America/Lima').valueOf();
  return moment.tz(dateString, 'MM/DD/YYYY', 'America/Lima').format();
}

function UTCTolimaTime(dateString) {
  var d = moment(dateString);
  return d.tz('America/Lima').format();
}


function diffMonths(fecha1, fecha2) {
  return Math.abs(fecha2.getMonth() - fecha1.getMonth())
       + (12 * Math.abs(fecha2.getFullYear() - fecha1.getFullYear()));
}


var grupo = '';
var today;

function cambiarMes(pageToVisit, cont, nums, body, callback ) {
  $ = cheerio.load(body);

  var EVENTTARGET = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTTARGET']+'"]').val() || "" );
  var EVENTARGUMENT = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTARGUMENT']+'"]').val() || "" );
  var VIEWSTATE = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__VIEWSTATE']+'"]').val() || "" );
  var EVENTVALIDATION = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTVALIDATION']+'"]').val() || "" );
  var ctl00TextBoxUsuario = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario']+'"]').val() || "" );
  var ctl00TextBoxClave = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave']+'"]').val() || "" );
  var ctl00RadioButtonList1 = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1']+'"]').val() || "" );
  var ctl00ContentGrupo = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs'][grupo]+'"]').val() || "" );

  // seleccionamos mes
  EVENTTARGET = encodeURIComponent('ctl00$Calendar1');
  EVENTARGUMENT = 'V' + dateToNumber( new Date( today.getFullYear(), today.getMonth()-(++cont), 1 ) ).toString();
  //EVENTARGUMENT = 'V' + dateToNumber( new Date( date.getFullYear(), date.getMonth(), 1 ) ).toString();

  var request_body = encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTTARGET'])+'='+EVENTTARGET+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTARGUMENT'])+'='+EVENTARGUMENT+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['__VIEWSTATE'])+'='+VIEWSTATE+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTVALIDATION'])+'='+EVENTVALIDATION+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario'])+'='+ctl00TextBoxUsuario+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave'])+'='+ctl00TextBoxClave+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1'])+'='+'BD2';

  //console.log( "--------------------" );
  //console.log("requiriendo mes: ", new Date( today.getFullYear(), today.getMonth()-cont, 1 ));
  //console.log( request_body );
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     _inputs[pageToVisit]['url'],
    body:    request_body
  }, function(error, response, body){
    if(error)
      console.log("Error: " + error);
    
    console.log( "Seleccion de mes ok", response.statusCode );
    //console.log( "--------------------" );
    if(response.statusCode === 200) {
      if (--nums <= 0) callback(body);
      else cambiarMes( pageToVisit, cont, nums, body, callback );
    } else {
      callback(false);
    }
  });
}

function cambiarDia(pageToVisit, date, body, callback ) {
  $ = cheerio.load(body);

  var EVENTTARGET = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTTARGET']+'"]').val() || "" );
  var EVENTARGUMENT = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTARGUMENT']+'"]').val() || "" );
  var VIEWSTATE = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__VIEWSTATE']+'"]').val() || "" );
  var EVENTVALIDATION = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['__EVENTVALIDATION']+'"]').val() || "" );
  var ctl00TextBoxUsuario = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario']+'"]').val() || "" );
  var ctl00TextBoxClave = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave']+'"]').val() || "" );
  var ctl00RadioButtonList1 = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1']+'"]').val() || "" );
  var ctl00ContentGrupo = encodeURIComponent( $('input[name="'+_inputs[pageToVisit]['inputs'][grupo]+'"]').val() || "" );

  // seleccionamos fecha
  //var date = new Date("08/18/2017");
  var dateBase = new Date("07/30/2017");
  var dateBaseNum = 6420;
  var timeDiff = date.getTime() - dateBase.getTime();
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  date = dateBaseNum + diffDays;
  //console.log( date );

  EVENTTARGET = encodeURIComponent('ctl00$Calendar1');
  EVENTARGUMENT = date.toString();

  var request_body = encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTTARGET'])+'='+EVENTTARGET+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTARGUMENT'])+'='+EVENTARGUMENT+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['__VIEWSTATE'])+'='+VIEWSTATE+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['__EVENTVALIDATION'])+'='+EVENTVALIDATION+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxUsuario'])+'='+ctl00TextBoxUsuario+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$TextBoxClave'])+'='+ctl00TextBoxClave+'&'+
    encodeURIComponent(_inputs[pageToVisit]['inputs']['ctl00$RadioButtonList1'])+'='+'BD2';

  //console.log( request_body );
  
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     _inputs[pageToVisit]['url'],
    body:    request_body
  }, function(error, response, body){

    if(error)
      console.log("Error: " + error);
    console.log( "Cambio de dia visita ok, fecha cambiada", response.statusCode );
    //console.log( body );
    // obtener datos del formulario
    if(response.statusCode === 200) {
      callback(body);
    } else {
      callback(false);
    }
  });
}

function getCSV(pageToVisit, body, callback ) {
  $ = cheerio.load(body);


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

  console.log( "Pidiendo csv", request_body );

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     _inputs[pageToVisit]['url'],
    body:    request_body
  }, function(error, response, body){

    if(error)
      console.log("Error: " + error);
    console.log( "Tercera visita ok, csv descarga", response.statusCode );
    //console.log( body );
    // obtener datos del formulario
    if(response.statusCode === 200) {
      var res = {};
      res.data = body
        .split('\r\n')
        .filter(function(element, index){
          return (index-1)%300 == 0;
        })
        .map(e => e.split(','))

      callback(res);
    } else {
      callback(false);
    }
   
  });
}



function requestHistorico( params, callback ) {
  var pageToVisit = "Charcani" + params['turbina'];
  grupo = "grupo" + params['grupo'];
  var date = new Date(params['fecha']); // 08/21/2017
  today = new Date(UTCTolimaTime( new Date().toISOString() ));

  var data = [];
  var res = {};

  request( _inputs[pageToVisit]['url'], function(error, response, body) {
    if(error)
      console.log("Error: " + error);
    // obtener datos del formulario
    //console.log( "Primera visita ok" );
    if(response.statusCode === 200) {
      
      var num_months = diffMonths(date, today);
      var cont = 0;
      if( num_months != 0) {
        cambiarMes(pageToVisit, cont, num_months, body, function(body){
          cambiarDia(pageToVisit, date, body, function(body){
            getCSV(pageToVisit, body, callback);
          });
        });
      } else {
        cambiarDia(pageToVisit, date, body, function(body){
          getCSV(pageToVisit, body, callback);
        });
      }

    } else {
      callback(false);
    }
  });
}

function parseParams( params ){
  params = params.split('&');
  res = {};
  params.forEach(function(element) {
    var kv = element.split('=');
    res[kv[0]] = decodeURIComponent( kv[1] );
  });
  return res;
}

function validateParams( params ){
  //console.log ("validating")
  if( params['turbina'] && params['grupo'] && params['fecha'] ) {
    var turbina = parseInt( params['turbina'] );
    var grupo = parseInt( params['grupo'] );
    //console.log ("good")
    if( turbina>=1 && turbina<=6 )
      if( grupo>=1 && grupo<=3 )
        return true;
  }
  //console.log ("bad")
  return false;
}

http.createServer(function(req, res){
  var params = req.url.split('?')[1];
  req.url = req.url.split('?')[0];
  if (params)
    params = parseParams( params );
  
  console.log ('REQUIRED:', req.url);
  if( req.url == '/' ) {
    requestEgasa(function(data){
      if( data === false ) {
          res.writeHead(404,{'Content-Type':'text/html'});
          res.end('404 error');
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
      }
    });
  } else if( req.url == '/historico' ) {
    if (params && validateParams(params)) {
      console.log (params);
      console.log ('============');
      requestHistorico(params, function(data){
        if( data === false ) {
          res.writeHead(404,{'Content-Type':'text/html'});
          res.end('500 error');
        } else {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(data));
          res.end();
        }
      });
    } else {
      res.writeHead(404,{'Content-Type':'text/html'});
      res.end('404 error');
    }
  } else {
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end('404 error');
  }

}).listen(9090);
console.log ("server on port 9090");