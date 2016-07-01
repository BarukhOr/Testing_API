import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from '../config.js';
const server = config.server;

chai.use(chaiHttp);

// use 'describe' to group together similar tests
describe('User',function(){
	describe("Validation", function(){

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

		it('gets a status 200 from the authenticated test route with a valid token',(done)=>{
			chai.request(server)
				.get('/authenticatedtest')
				.set("authorization",'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Nzc2MGMyOTVjYTBjMzg0MjEzMzBkZTUiLCJpYXQiOjE0NjczNTQxNTQzMDYsImV4cCI6MTQ2NzM3NTc1NDMwNn0.CX9TskZvbK5ZXrc2lfscK63hIIvY1pZ_zA_qetmF0QE')
				.end(function(err,res){
					expect(res).to.have.status(200);
					done();
				})
		});

		it('fails, when making a request to the authenticated route using an improper token',(done)=>{
			chai.request(server)
				.get('/authenticatedtest')
				.set("authorization",'eyJ0eXAiOiJKV1QiLCiJIUzI1NiJ9.eyJzdWIiOiI1Nzc2MGMyOTVjYTBjMzg0MjEzMzBkZTUiLCJpYXQiOjE0NjczNTQxNTQzMDYsImV4cCI6MTQ2NzM3NTc1NDMwNn0.CX9TskZvbK5ZXrc2lfscK63hIIvY1pZ_zA_qetmF0QE')
				.end(function(err,res){
					expect(res).to.have.status(401);
					done();
				})
		});

		it('tests the signin route with a valid email and password',(done)=>{
			chai.request(server)
				.post('/signin')
				.send({'email': 'Java@Scripto.io','password': '123456'})
				.end(function(err,res){
					expect(res).to.have.status(200);
					done();
				})
		});

		it('tests the signin route with a invalid email and password',(done)=>{
			chai.request(server)
				.post('/signin')
				.send({'email': 'Java@Scripto.iio','password': '1234561'})
				.end(function(err,res){
					expect(res).to.have.status(401);
					done();
				})
		});
	})
});