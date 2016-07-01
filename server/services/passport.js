const passport = require('passport');
const User = require('../models/user');
const config = require('../../config.js');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// create local strategy
const localOptions = {usernameField:'email'}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	email = email.toLowerCase();
	User.findOne({email:email},function(err,user){
		if (err) { return done(err); }
		if(!user) { return done(null, false); }

		//compare passwords - is the password provided by the user equal to the password that has been saved?
		user.comparePassword(password, function(err, isMatch){
			if (err) { return done(err); }
			if ( !isMatch ) { return done(null, false); }

			return done(null,user);
		})
	})
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new Strategy(jwtOptions, function(payload, done){
	// See if the user ID in the payload exists in our database
	User.findById(payload.sub,function(err, user){
		if (err) { return done(err, false)}

		// If it does, call done with that user
		if (user){
			done(null,user)
		}
		
		// Otherwise call done without a user object
		else{
			done(null,false)
		}
	})

})

// Tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);