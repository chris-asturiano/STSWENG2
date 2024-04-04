const request = require('supertest');
const app = require('../app').app;
const User = require('../database/schemas/User');

describe('POST /register', () => {
  it('should return error if passwords do not match', async () => {
    const userData = {
      username: 'testuser',
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
    jest.spyOn(User, 'findOne').mockResolvedValueOnce({ username: 'existingUser' });

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
  });

  it('should return error if email is already registered', async () => {
    //  existing email
    jest.spyOn(User, 'findOne').mockResolvedValueOnce({ email: 'test@example.com' });

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

    expect(response.status).toBe(200); 
    expect(response.text).toContain('Email is already registered');
  });

  it('should redirect to login route if registration is successful', async () => {
    //  successful registration
    jest.spyOn(User.prototype, 'save').mockResolvedValueOnce();

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
  });
  afterAll(async () => {
    jest.restoreAllMocks();
  });
});
