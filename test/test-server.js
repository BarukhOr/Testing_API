import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from '../config.js';
const server = config.server;

chai.use(chaiHttp);

// use 'describe' to group together similar tests
describe('Authentication',function(){
	it('tests whether the app is up', (done)=> {
		chai.request(server)
			.get('/')
			.end(function (err, res) {
		     expect(err).to.be.null;
		     expect(res).to.have.status(200);
		     done();
		  });
	})

	it('tests whether POST /signup works',(done)=> {
		chai.request(server)
			.post('/signup')
			.send({'email': 'Java@Script.io', 'password': '123456'})
			.end(function(err,res){
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('token');
				done();
			})
	})

	it('tests whether POST /signup works with only a password',(done)=> {
		chai.request(server)
			.post('/signup')
			.send({'password': '123456'})
			.end(function(err,res){
				expect(res).to.have.status(422);
				done();
			})
	})
	
	it('should delete the user account created in test /signup',(done)=>{
		chai.request(server)
			.post('/deleteUser')
			.send({'email': 'Java@Script.io'})
			.end(function(err,res){
				expect(err).to.be.null;
				expect(res).to.have.status(204);
				done();
			})
	});
});