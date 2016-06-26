import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app.js';
chai.use(chaiHttp);

// use 'describe' to group together similar tests
describe('App',function(){
	it('testing that the app is up', (done)=> {
		chai.request(server)
			.get('/')
			.end(function (err, res) {
		     expect(err).to.be.null;
		     expect(res).to.have.status(200);
		     done();
		  });
	})
	it('should list all users on /users GET');
	it('should list a single user on /user/<id> GET');;
	it('should add a single user on /user POST');
});