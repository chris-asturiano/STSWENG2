const request = require('supertest');
const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');
const app = require('../app').app;

const { closeConnection } = require('../database');



describe('POST /login', () => {
  it('responds with redirect to /profiles on successful login', async () => {
    // hashed password
    const hashedPassword = await bcrypt.hash('password', 10);

    const fakeUser = { username: 'testuser', password: 'password'};
    
    await User.create({ username: 'testuser', password: hashedPassword, email: 'testemail@gmail.com', role: 'adopter' });

    const response = await request(app)
      .post('/login_route/login')
      .send(fakeUser);

    expect(response.status).toBe(302); 
    expect(response.header.location).toBe('/profiles'); 
  });

  it('responds with error message on invalid password', async () => {
    const fakeUser = { username: 'testuser', password: 'wrongpassword' };

    const response = await request(app)
      .post('/login_route/login')
      .send(fakeUser);

    expect(response.status).toBe(200); 
    expect(response.text).toContain('Invalid password'); 
  });

  it('responds with error message on invalid username', async () => {
    const fakeUser = { username: 'invalidname', password: 'password' };

    const response = await request(app)
      .post('/login_route/login')
      .send(fakeUser);

    expect(response.status).toBe(200); 
    expect(response.text).toContain('Invalid username'); 
  });

  afterAll(async () => {
    // delete the user
    await User.deleteMany({ username: 'testuser' });
    closeConnection();
  });
});
