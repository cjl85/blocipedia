const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/users/';
const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

describe('routes : users', () => {
		beforeEach(done => {
			sequelize
				.sync({ force: true })
				.then(() => {
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});

		describe('#create()', () => {
			it('should create a User object with a valid email and password', done => {
				User.create({
					name: 'User',
					email: 'user@example.com',
					password: '1234567890',
				})
					.then(user => {
						expect(user.name).toBe('User');
						expect(user.email).toBe('user@example.com');
						expect(user.id).toBe(1);
						done();
					})
					.catch(err => {
						console.log(err);
						done();
					});
			});

			it('should not create a user with invalid username', done => {
				User.create({
					name: 'dog',
					email: 'user@example.com',
					password: 'dog',
				})
					.then(user => {

						done();
					})
					.catch(err => {
						expect(err.message).toContain('Validation error: must be a valid username');
						done();
					});
			});

			it('should not create a user with invalid email', done => {
				User.create({
					name: 'User',
					email: "User",
					password: '1234567890',
				})
					.then(user => {


						done();
					})
					.catch(err => {
						expect(err.message).toContain('Validation error: must be a valid email');
						done();
					});
			});

			it('should not create a user with invalid password', done => {
				User.create({
					name: 'User',
					email: 'user@example.com',
					password: 'dog',
				})
					.then(user => {

						done();
					})
					.catch(err => {
						expect(err.message).toContain('Validation error: must be a valid password');
						done();
					});
			});


			it('should not create a user with a username already taken', done => {
				User.create({
					name: 'User',
					email: 'user@example.com',
					password: '1234567890',
				})
					.then(user => {
						User.create({
							name: 'User',
							email: 'user@example.com',
							password: 'dog',
						})
							.then(user => {
								// the code in this block will not be evaluated since the validation error
								// will skip it. Instead, we'll catch the error in the catch block below
								// and set the expectations there

								done();
							})
							.catch(err => {
								expect(err.message).toContain('Validation error');
								done();
							});

						done();
					})
					.catch(err => {
						console.log(err);
						done();
					});
			});

			it('should not create a user with an email already taken', done => {
				User.create({
					name: 'User',
					email: 'user@example.com',
					password: '1234567890',
				})
					.then(user => {
						User.create({
							name: 'User',
							email: 'user@example.com',
							password: 'dog',
						})
							.then(user => {


								done();
							})
							.catch(err => {
								expect(err.message).toContain('Validation error');
								done();
							});

						done();
					})
					.catch(err => {
						console.log(err);
						done();
					});
			});
		});

		describe('GET /users/sign_in', () => {
			it('should render a view with a sign in form', done => {
				request.get(`${base}sign_in`, (err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain('Sign in');
					done();
				});
			});
		});

		describe('GET /users/sign_up', () => {
			it('should render a view with a sign up form', done => {
				request.get(`${base}sign_up`, (err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain('Sign up');
					done();
				});
			});
		});
