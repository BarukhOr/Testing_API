const Authentication = require('../controllers/authentication');

module.exports =  function(app){
  app.get('/',function(request,response,next){
    response.send(["Greetings welcome to the jungle","Phone","Stool","Speaker"])
  });

  app.post('/signup', Authentication.signup)

  app.post('/deleteUser', Authentication.delete)
}