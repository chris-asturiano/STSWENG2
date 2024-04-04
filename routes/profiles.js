const express = require('express');
const router = express.Router();
const Pet = require('../database/schemas/Pet');

router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find({}).lean().exec();
        res.render('profiles', { title: "Pet Profiles", pets: pets });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;