var config = require('../../config/environment');

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseConfigFile),
  databaseURL: config.databaseUrl,
});

var db = admin.database();

exports.setData = function(ref, data, callback) {
	var Ref = db.ref(ref);
	Ref.push().set(data, function(error) {
		if(error) {
			if(callback) {
				callback(error);
			}
		} else {
			if(callback) {
				callback();
			}
		}
	});
}
