const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
	try {
		// Retrieve the role from the query parameters
		const role = req.query.role;
		console.log('role: ', role);
		// Render the registration form view with the role information
		res.render('registration_form', { title: 'Registration Form', has_style: 'registration_form_style', role: role});
	} catch (err) {
		console.error('Error rendering registration form:', err);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/register', async (req, res) => {
    try {
        // Extract data from the request body
        const { username, email, password, password_confirm, role } = req.body;
        
        if (password !== password_confirm) {
            return res.render('registration_form', { title: 'Registration Form', error: 'Passwords do not match', has_style: 'registration_form_style' });
        }
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('registration_form', { title: 'Registration Form', error: 'Username is already taken', has_style: 'registration_form_style' });
        }
        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.render('registration_form', { title: 'Registration Form', error: 'Email is already registered', has_style: 'registration_form_style' });
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // new user object with hashed password
        const newUser = new User({
            username,
            password: hashedPassword,
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