var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    request = require('request');
var phantom = require('phantom');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/search/:kuler', function (req, res) {
	var kulerURL = req.params.kuler;
	console.log('Searching at: ' + kulerURL);
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open(kulerURL, function (status) {
	    	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
		      page.evaluate(function () { return $('.themeBox').html(); }, function (result) {
		        var re = new RegExp(/#[A-Z0-9]{6}/g);
		        var hexCodes = result.match(re);
		        console.log(hexCodes);
		        res.send(hexCodes);
		        ph.exit();
		    });
	      });
	    });
	  });
	});
});

app.get('/search', function (req, res) {
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open('https://color.adobe.com/create/color-wheel/?copy=true&base=0&rule=Analogous&selected=3&name=Copy%20of%20Firenze&mode=rgb&rgbvalues=0.27451,0.537255,0.4,0.2706947088417046,0.5872550000000001,0.5210540687390179,0.28913267591506825,0.627255,0.5035843169878103,0.28913267591506825,0.49411764705882355,0.35492874572482586,0.2706947088417046,0.5872550000000001,0.322720939059917&swatchOrder=0,1,2,3,4', function (status) {
	    	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
		      page.evaluate(function () { return $('.themeBox').html(); }, function (result) {
		        var re = new RegExp(/#[A-Z0-9]{6}/g);
		        var hexCodes = result.match(re);
		        console.log(hexCodes);
		        res.send(hexCodes);
		        ph.exit();
		      });
	      	});
	    });
	  });
	});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server started on localhost:3000');
});