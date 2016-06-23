import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app.js';
chai.use(chaiHttp);

// use 'describe' to group together similar tests
describe('App',function(){
	it('should return an array of strings',() => {
		chai.request(server)
			.get('/test')
			.end(function(err,res){
				// console.log(res.text)
				expect(res.text).to.be.eql("ok ... whats going on ");
			})
	})
	it('should list all users on /users GET');
	it('should list a single user on /user/<id> GET');;
	it('should add a single user on /user POST');
});

