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
	    page.open('https://color.adobe.com/sandy-stone-beach-ocean-diver-color-theme-15325/edit/?copy=true', function (status) {
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