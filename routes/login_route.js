const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const User = require('../database/schemas/User');

// Also require like database stuffs for MongoDB, put here

router.get('/', async (req, res)=>{
  try {
    res.render('login', {title: 'Login Page'});
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async function(req, res) {// /login_route/login
  try {
    // logic for checkin if user is adopter/kennel
    const loginUser = await User.findOne({username: req.body.username});
    if (loginUser) {
      const result = req.body.password === loginUser.password;
      if (result) {
        console.log('Login Success');
        res.redirect('/petSearch.html');
      } else {
        console.log('Login Fail');
        return res.render('login',
            {error: 'Invalid password', title: 'Login Page'});
      }
    } else {
      console.log('Login Fail');
      return res.render('login',
          {error: 'Invalid username', title: 'Login Page'});
    }

    // for now all reroutes to pet search, but pet search is for adopter
    console.log('Login Attempted');
    // res.redirect('/petSearch.html');
    // else go back, than error????
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
