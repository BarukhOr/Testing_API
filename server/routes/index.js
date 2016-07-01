const Authentication = require('../controllers/authentication');
const passport = require('passport');
const PassportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt',{session:false});

module.exports =  function(app){
  app.get('/',function(request,response,next){
    response.send(["Greetings welcome to the jungle","Phone","Stool","Speaker"])
  });

  app.post('/signup', Authentication.signup)

  app.post('/deleteUser', Authentication.delete)

  app.get('/authenticatedtest',requireAuth, function(req,res){
  	res.send({Success:"Request was successfully made"})
  })
}