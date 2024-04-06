const express = require('express');
const router = express.Router();

const Pet = require('../database/schemas/Pet');

router.get('/', (req, res) => {
    try {
        if (!req.session.userId) { res.redirect('/login_route'); return; }
        res.render( 'newPet', { title: 'Create Custom Pet Listing' } );
    } catch (err) {
        console.error('Error in custom listing page:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/custom', async (req, res) => {
    try {
        const { species, maintenance, temper, name} = req.body;
        const newPet = new Pet({
            species: species,
            petcode: 'dummy' + species,
            name: name,
            description: "This is a custom pet.",
            in_gallery: 1,
            maintenance: maintenance,
            temper: temper
        });
      
        await newPet.save();
        console.log('Successfully created a custom pet');
        res.redirect('/profiles');
    } catch (err) {
        console.error('Error in posting new custom pet:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;