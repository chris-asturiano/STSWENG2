const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const User = require('../database/schemas/User');


router.get('/', async (req, res) => {
  try {
    // Retrieve the role from the query parameters
    const role = req.query.role;
    console.log('role: ', role);
    // Render the registration form view with the role information
    res.render('registration_form', {title: 'Registration Form', role: role});
  } catch (err) {
    console.error('Error rendering registration form:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/register', async (req, res) => {
  try {
    // Extract data from the request body

    const {username, email, password, passwordConfirm, role} = req.body;
    // Perform any necessary validation checks here
    if (password!== passwordConfirm) {
      console.log('nuh uh');
      return res.render('registration_form',
          {title: 'Registration Form', error: 'Passwords do not match'});
    }
    // error will show one at a time
    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.render('registration_form',
          {title: 'Registration Form', error: 'Username is already taken'});
    }
    // PASSWORD IS NOT ENCRYPTED ATM
    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.render('registration_form',
          {title: 'Registration Form', error: 'Email is already registered'});
    }

    // Create a new user object
    const newUser = new User({
      username,
      password, // hashing soon
      email,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Redirect the user to a success page or any other appropriate action
    console.log('redirect to login');
    res.redirect('/login_route');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
