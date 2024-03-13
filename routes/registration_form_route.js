const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/User');


router.get('/', async (req, res) => {
    try {
        // Retrieve the role from the query parameters
        const role = req.query.role;
        console.log('bruh: ', role)
        // Render the registration form view with the role information
        res.render('registration_form', { title: "Registration Form"});
    } catch (err) {
        console.error('Error rendering registration form:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/register', (req, res) => {
    try {
        const { username, role, password, email } = req.body;

        // Create a new user document and save it to the database
        const newUser = new User({
            username,
            role,
            password,
            email
        });
        newUser.save();

        // Redirect the user to the login page after successful registration
        res.redirect('/login_route');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
    }
});

module.exports = router;
