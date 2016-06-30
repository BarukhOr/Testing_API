const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: {
  	type: String,
  	unique: true,
  	lowercase: true
  },
  name: String,
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next){
	// Get access to the user model
	const user= this;

	// Generate a salt
	bcrypt.genSalt(10, function(err, salt){
		if (err) { return next(err); }

		// Hash (encrypt) the password using the salt
		bcrypt.hash(user.password, salt, null, function(err,hash){
			if (err) { return next(err); }

			// Overwrite the plaintext password with the encrypted password
			user.password = hash;
			next();
		})
	})
})

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports =  ModelClass;