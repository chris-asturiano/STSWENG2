const request = require('supertest');
const User = require('../database/schemas/User');
const app = require('../app').app;




describe('Logout test', () => {
  it('user should successfully redirect to /login_route after logging out', async () => {
    // simulate logging in first
    const fakeUser = { username: 'testuser', password: 'password'};
    await User.create({ username: 'testuser', password: 'password', email: 'testemail@gmail.com', role: 'adopter' });

    await request(app)
      .post('/login_route/login')
      .send(fakeUser);
      
    // simulate logging out
    const response = await request(app)
      .get('/logout');

    //   delete the user
    await User.deleteMany({ username: 'testuser' });

    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login_route');

  });
});