const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const User = require('../database/schemas/User');

// Also require like database stuffs for MongoDB, put here

router.get('/', async (req, res)=>{ 
    try {
        res.render('login',{ title: "Login Page", has_style: "login_style" });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async function(req, res){// /login_route/login
    try {
        //logic for checkin if user is adopter/kennel
        const login_user = await User.findOne({ username: req.body.username })
        if(login_user){
            const result = req.body.password === login_user.password;
            if (result){
                console.log('Login Success');
                req.session.userId = login_user._id;
                req.session.search = get_empty_search();
                res.redirect('/profiles');
            } else {
                console.log('Login Fail');
                return res.render('login', { error: 'Invalid password', title: "Login Page", has_style: "login_style" });
            }
        } else {
            console.log('Login Fail')
            return res.render('login', { error: 'Invalid username', title: "Login Page", has_style: "login_style" });
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

function get_empty_search() {
    return { 
        species: {
            DNM: false,
            doggo: false,
            hissy: false,
            borb: false,
            smol: false
        }, 
        maintenance: {
            DNM: false,
            high: false,
            low: false
        }, 
        temper: {
            DNM: false,
            playful: false,
            lax: false
        } 
    };
}


module.exports = router;
