const express = require('express');
const router = express.Router();
const Pet = require('../database/schemas/Pet');

router.get('/', async (req, res) => {
    try {
        if (!req.session.userId) { res.redirect('/login_route'); }
        const pets = await Pet.find({}).lean().exec();
        res.render('profiles', { title: "Pet Profiles", pets: pets });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const petcode = req.params.id;
        const pet_data = await Pet.findOne({petcode: petcode});
        res.send(pet_data);
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
})

module.exports = router;