'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/environment');
var firebaseResource = require('./resources/firebaseResource');
var dataResource = require('./resources/dataResource');


dataResource.feedDataSequentially(config.newsFile)
	.then(function() {
		console.log('ended succesfully');
		process.exit(0);
	})
	.fail(function(error) {
		console.log('ended with error');
		console.log(error);
		process.exit(1);
	})
	.progress(function(data) {
		console.log('progress');
		console.log(data);
		firebaseResource.setData('/news/new/', data, function(error) {
			if (error) {
				console.log('Error occured when writing data to database '+ error);
			} else {
				console.log('Data written to database');
			}
		});
	});

