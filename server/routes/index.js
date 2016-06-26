module.exports = function(app){
  app.get('/',function(request,response,next){
    response.send(["Greetings welcome to the jungle","Phone","Stool","Speaker"])
  });
}