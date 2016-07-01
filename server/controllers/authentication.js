const jwt = require('jwt-simple');
const config = require('../../config.js');
const User = require('../models/user');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	const expiry = expiryTime(timestamp);

	return jwt.encode({ sub: user.id, iat: timestamp, exp: expiry}, config.secret)
}

function expiryTime(timestamp){
	// Expires in 6 hours
	const timeout = 6;
	const expiry = timeout*60*60*1000;

	return (timestamp+expiry)
}

exports.signin = function(req, res, next){
	// User has already had their email and password authenticated
	// We just need to give them a json web token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
	let email = "", password = "";

	if (!req.body.email || !req.body.password){
		return res.status(422).send({error: 'Please enter a username and password'})
	}else{
		email = req.body.email.toLowerCase();
		password = req.body.password;
	}

	// See if a user with the given email exists
	User.findOne({'email': email}, function(err, existingUser){

		if (err) { return next(err); }

		// If a user with the email does exist, return an error
		if (existingUser) {			
			return res.status(422).send({error: 'Email is in use'});
		}

		// If a user with email does not exist, cr9eate and save user record
		const user = new User({
			email: email,
			password: password
		})

		user.save(function(err){
			if (err) { return next(err); }
			res.status(200).json({
				success: 'Account Created',
				token: tokenForUser(user)
			});
		})
	});
}

exports.delete = function(req, res, next){
	const email = req.body.email.toLowerCase();

	User.remove({email: email}, function(err){
		if (err) { return next(err); }
		return res.status(204).send({error: 'Account has been deleted'});
	})
}