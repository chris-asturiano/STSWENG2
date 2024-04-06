const express = require('express');
const router = express.Router();
const multer = require('multer');

const Pet = require('../database/schemas/Pet');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/assets/pet_gallery/'); 
	},
	filename: function(req, file, cb) {
		cb(null, req.body.name + '_img0.png');
	}
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
	try {
		if (!req.session.userId) { 
			res.redirect('/login_route'); 
			return; 
		}
		res.render('newPet', { title: 'Create Custom Pet Listing' });
	} catch (err) {
		console.error('Error in custom listing page:', err);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/custom', upload.single('image'), async (req, res) => {
	try {
		const { species, maintenance, temper, name, description } = req.body;
		const newPet = new Pet({
			species: species,
			petcode: name,
			name: name,
			description: description,
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
