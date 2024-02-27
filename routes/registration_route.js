const { Router } = require('express'); 
const router = Router();

//also require like database stuffs?? idk

router.get('/', async (req, res)=>{ 
    try {
        res.render('registration',{title: "Registration"});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;