const { Router } = require('express'); 
const router = Router();

//also require like database stuffs?? idk

const User = require('../database/schemas/User');
// /registration_route/
router.get('/', async (req, res)=>{ // /registration_route
    try {
        console.log('bruh')
        res.render('registration',{title: "Registration"});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;