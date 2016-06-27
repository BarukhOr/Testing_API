exports.signup = function(request, response, next){
	console.log("Signup successful")
	response.send({success:'true'})
}