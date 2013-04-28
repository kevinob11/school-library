var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  	User.find(id).done(function(err, user) {
	    return done(err, user);
	});
});

passport.use(new LocalStrategy(function(username, password, done) {

	User.find({
		username: username
	}).done(function(err, user) {
		if (err) {
		    return done(err);
		} else if (!user || user.password != password) {
		  	return done(null, false);
		} else {
		    return done(null, user);
		}
	});

}));

module.exports = {
	
	// Name of the application (used as default <title>)
	appName: "Sails Application",

	// Port this Sails application will live on
	port: 1337,

	// The environment the app is deployed in 
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	// Logger
	// Valid `level` configs:
	// 
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: 'info'
	},

	// Custom express middleware - we use this to register the passport middleware
	express: {
		customMiddleware: function(app)
		{
			app.use(passport.initialize());
			app.use(passport.session());
		}
	}

};