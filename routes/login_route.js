const { Router } = require('express'); 
const router = Router();

//also require like database stuffs for MongoDB, put here

router.get('/', async (req, res)=>{ 
    try {
        res.render('login',{title: "Login Page"});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', (req, res) => {// /login_route/login
    try {
        //if user then
        console.log('Yep loggin in')
        res.redirect('/petSearch.html');
        //else go back, than error????
        
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;