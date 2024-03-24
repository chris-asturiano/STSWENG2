const mongoose = require('mongoose');
const User = require('./schemas/User');

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/STSWENG')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

// user_populate() //works

// populate user mongodb test
async function user_populate() {
  try {
    User.insertMany([
      {username: 'Test', password: '12345', email: 'a@a.com', role: 'adopter'},
      {username: 'Test2', password: '123456', email: 'b@b.com', role: 'adoptee'},
    ]);
  } catch (e) {
    console.log(e.message);
  }
}

// burn user
async function users_delete() {
  try {
    User.deleteMany({})
        .then((result) => {
          console.log(`Refreshed ${result.deletedCount} users`);
        })
        .catch((error) => {
          console.error('Error deleting users:', error);
        });
  } catch (e) {
    console.log(e.message);
  }
}
