var fs = require('fs');
var q = require('q');

var cachedObjects = null;

var getObjectByIndex = function(file, index, callback) {
	if (cachedObjects == null) {
		try {
			content = fs.readFileSync(file);
			cachedObjects = JSON.parse(content);
		} catch(err) {
			callback(err, null);
			return;
		}
 	}
	if(cachedObjects[index] != null || cachedObjects != 'undefined') {
		callback(null, cachedObjects[index]);
	} else {
		callback(null, null);
	}
}



exports.feedDataSequentially = function(file) {
	return q.promise(function(resolve, reject, notify) {
		var index = 0;

		var worker = setInterval(function() {
			getObjectByIndex(file, index, function(err, obj) {
				if(err) {
					reject(err);
					clearInterval(worker);
				}
				if(obj == null) {
					resolve();
					clearInterval(worker);
				} else {
					notify(obj);
				}
			});
			index++;
		}, 2000);
	});
}