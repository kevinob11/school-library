/*---------------------
	:: User 
	-> controller
---------------------*/
var UserController = {

	create: function (req, res) {

		if (req.body.password) {
			req.body.password = require('crypto').createHash('sha256').update(req.body.password).digest("hex");
		}

		User.create(req.body).done(function(err,user){
			if (err) {
				res.send("Error creating user.");
			} else {
				res.send("User created successfully.");
			}
		});

	},

	update: function (req, res) {

		if (req.body.password) {
			req.body.password = require('crypto').createHash('sha256').update(req.body.password).digest("hex");
		}

		User.update(req.body).done(function(err,user){
			if (err) {
				res.send("Error updating user.");
			} else {
				res.send("User updated successfully.");
			}
		});

	}

};
module.exports = UserController;