/*---------------------
	:: Auth 
	-> controller
---------------------*/

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  	User.find({id: id}).done(function(err, user) {
	    return done(err, user);
	});
});

passport.use(new LocalStrategy(function(username, password, done) {

	User.find({
		username: username
	}).done(function(err, user) {
		var hash = require('crypto').createHash('sha256').update(password).digest("hex");

		if (err) {
		    return done(err);
		} else if (!user || !user.password || user.password != hash) {
		  	return done(null, false);
		} else {
		    return done(null, user);
		}
	});

}));

var AuthController = {

	login: function (req,res) {

		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send('Incorrect username or password.');
			}

			req.logIn(user, function(err) {
				if (err) {
					console.log(err);
					return res.send('Error logging in.');
				}
				
				delete user.values.password;

				return res.send(user.values);
			});
		})(req, res);

	},

	logout: function (req,res) {

		req.logout();
		res.send('Successfully logged out.');

	},

	active: function (req,res) {

		if (req.user) {
			User.find({id: req.user.id}).done(function(err, user) {
			    delete user.values.password;
			    res.send(user.values);
			});
		} else {
			res.send();
		}

	}

};

module.exports = AuthController;