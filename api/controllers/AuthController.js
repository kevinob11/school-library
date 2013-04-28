/*---------------------
	:: Auth 
	-> controller
---------------------*/

var passport = require('passport');

var AuthController = {

	login: function (req,res) {

		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send('Error with your username or password.');
			}

			req.logIn(user, function(err) {
				if (err) {
					console.log(err);
					return res.send('Error logging in.');
				}
				
				return res.send('Successfully logged in.');
			});
		})(req, res);

	},

	logout: function (req,res) {

		req.logout();
		res.send('Successfully logged out.');

	}

};
module.exports = AuthController;