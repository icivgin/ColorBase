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
	  console.log('phantom loaded...');
	  ph.createPage(function (page) {
	  	console.log('page created...');
	    page.open(kulerURL, function (status) {
	    	console.log('page opend...');
	    	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
		      console.log('before');
		      setTimeout(function(){
		      	console.log('after');
		      	page.evaluate(function () { return $('.themeBox').html(); }, function (result) {
			        var re = new RegExp(/#[A-Z0-9]{6}/g);
			        var hexCodes = result.match(re);
			        console.log(hexCodes);
			        res.send(hexCodes);
			        ph.exit();
			        console.log('this is bad');
		    	});
		  	  }, 1000);
	        });
	    });
	  });
	});
});

function wait () {

}

app.get('/search', function (req, res) {
	console.log('searching');
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open('https://color.adobe.com/Aspirin-C-color-theme-251864/edit/?copy=true', function (status) {
	    	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
		      console.log('before');
		      setTimeout(function(){
		      	console.log('after');
		      	page.evaluate(function () { return $('.themeBox').html(); }, function (result) {
			        var re = new RegExp(/#[A-Z0-9]{6}/g);
			        var hexCodes = result.match(re);
			        console.log(hexCodes);
			        res.send(hexCodes);
			        ph.exit();
		    	});
		  	  }, 20000);
	        });
	    });
	  });
	});
});

// console.log('before');
// setTimeout(function(){
//     console.log('after');
// },5000);





// function waitFor(testFx, onReady, timeOutMillis) {
//     var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 30000, //< Default Max Timout is 3s
//         start = new Date().getTime(),
//         condition = false,
//         interval = setInterval(function() {
//             if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
//                 // If not time-out yet and condition not yet fulfilled
//                 console.log('testing......................');
//            		console.log('test: ' + testFx());
//                 condition = testFx(); //< defensive code
//             } else {
//                 if(!condition) {
//                     // If condition still not fulfilled (timeout but condition is 'false')
//                     console.log("'waitFor()' timeout");
//                     phantom.exit();
//                 } else {
//                     // Condition fulfilled (timeout and/or condition is 'true')
//                     console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
//                     typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
//                     clearInterval(interval); //< Stop this interval
//                 }
//             }
//         }, 250); //< repeat check every 250ms
// };

// phantom.create(function (ph) {
// 	  ph.createPage(function (page) {

// 		page.open("http://www.google.com", function (status) {

// 			var test = page.evaluate(function() {
// 				return document.title;
// 			});
// 			console.log(test);
// 			var title = 'passed and tested';


// 		    // Check for page load success
// 		    if (status !== "success") {
// 		        console.log("Unable to access network");
// 		    } else {
// 		        // Wait for 'signin-dropdown' to be visible
// 		        waitFor(function() {
// 		            // Check in the page if a specific element is now visible
// 		            return title;
// 		        }, function() {
// 		           console.log("The sign-in dialog should be visible now.");
// 		           ph.exit();
// 		        });        
// 		    }
// 		});
// });
// 	});




app.listen(process.env.PORT || 3000, function () {
  console.log('Server started on localhost:3000');
});