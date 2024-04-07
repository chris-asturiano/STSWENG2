const request = require('supertest');
const app = require('../app').app;
const User = require('../database/schemas/User');

describe('POST /register', () => {
  it('should return error if passwords do not match', async () => {
    const userData = {
      username: 'testuser1',
      email: 'test@example.com',
      password: 'password123',
      password_confirm: 'password456',
      role: 'adopter'
    };

    const response = await request(app)
      .post('/registration_form_route/register')
      .send(userData);

    expect(response.status).toBe(200); 
    expect(response.text).toContain('Passwords do not match');
  });

  it('should return error if username is already taken', async () => {
    //  existing user
    await User.create({ username: 'existingUser', password: 'password', email: 'f98dajfio@gmail.com', role: 'adopter' });

    const userData = {
      username: 'existingUser',
      email: 'test@example.com',
      password: 'password123',
      password_confirm: 'password123',
      role: 'adopter'
    };

    const response = await request(app)
      .post('/registration_form_route/register')
      .send(userData);

    expect(response.status).toBe(200); 
    expect(response.text).toContain('Username is already taken');
    
    // delete existingUser
    await User.deleteOne({ username: 'existingUser' });
  });

  it('should return error if email is already registered', async () => {
    //  existing email
    await User.create({ username: 'existingUser', password: 'password', email: 'test@example.com', role: 'adopter' });

    const userData = {
      username: 'testuser2',
      email: 'test@example.com',
      password: 'password123',
      password_confirm: 'password123',
      role: 'adopter'
    };

    const response = await request(app)
      .post('/registration_form_route/register')
      .send(userData);

    expect(response.status).toBe(200); 
    expect(response.text).toContain('Email is already registered');
    await User.deleteOne({ username: 'existingUser' });
  });

  it('should redirect to login route if registration is successful', async () => {
    //  successful registration

    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      password_confirm: 'password123',
      role: 'adopter'
    };

    const response = await request(app)
      .post('/registration_form_route/register')
      .send(userData);

    expect(response.status).toBe(302); 
    expect(response.header.location).toBe('/login_route');
    // delete the use r
    await User.deleteOne({ username: 'testuser' });
  });
});
