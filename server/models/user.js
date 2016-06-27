const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

//Define our model
const userSchema = new Schema({
  email: {
  	type: String,
  	unique: true,
  	lowercase: true
  },
  name: String,
  password: String
});

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports =  ModelClass;