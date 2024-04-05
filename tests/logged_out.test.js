const request = require('supertest');
const User = require('../database/schemas/User');
const app = require('../app').app;

const { closeConnection } = require('../database');



describe('Logged out tests', () => {
  it('should redirect to /login_route when trying to access /profiles while logged out', async () => {
    const response = await request(app)
        .get('/profiles');

    expect(response.status).toBe(302); 
    expect(response.header.location).toBe('/login_route'); 
  });

});