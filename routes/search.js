const express = require('express');
const router = express.Router();

const Pet = require('../database/schemas/Pet');
const { search } = require('./search');

router.get('/', async (req, res) => {
    try {
        if (!req.session.userId) { res.redirect('/login_route'); return; }
        if (Object.keys(req.query).length == 0) {
            res.render( 'search', { 
                title: 'Pet Search', 
                results: false, 
                search: req.session.search } ); return;
        }

        var params = {};
        req.session.search = get_empty_search();
        Object.keys(req.query).forEach(key => {
            var value = req.query[key];
            req.session.search[key][value] = true;
            if (value == 'DNM') return;
            params[key] = value;
        });
        console.log(params);
        const results = await Pet.find(params).lean().exec();
        console.log(req.session.search.temper);

        res.render( 'search', { 
            title: 'Pet Search', 
            results: results, 
            search: req.session.search } );
    } catch (err) {
        console.error('Error in search page:', err);
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