const express = require('express');
const router = express.Router();

const Pet = require('../database/schemas/Pet');

router.get('/', async (req, res) => {
    try {
        if (!req.session.userId) { res.redirect('/login_route'); }
        var params = {};
        Object.keys(req.query).forEach(key => {
            const value = req.query[key];
            if (value == 'DNM') return;
            params[key] = value;
        });
        console.log(params);
        const results = await Pet.find(params).lean().exec();
        res.render('search', { 
            title: "Pet Search", 
            results: (Object.keys(params).length == 0) ? false : results 
        });
    } catch (err) {
        console.error('Error in search page:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;