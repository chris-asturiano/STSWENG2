const mongoose = require('mongoose');
const User = require('./schemas/User');
const Pet = require('./schemas/Pet');

// Connect to MongoDB
mongoose
	.connect('mongodb+srv://user1:asd12345@swengtest.svfsh4k.mongodb.net/STSWENG2?retryWrites=true&w=majority&appName=swengtest')
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB', err));

/**
 * Populates test users
 */
async function userPopulate() {
	try {
		User.insertMany([
			{username: 'Test', password: '12345', email: 'a@a.com', role: 'adopter'},
			{username: 'Test2', password: '123456', email: 'b@b.com',
				role: 'adoptee'},
		]);
	} catch (e) {
		console.log(e.message);
	}
}

/**
 * Deletes users
 */
async function usersDelete() {
	try {
		User.deleteMany({})
			.then((result) => {
				console.log(`Refreshed ${result.deletedCount} users`);
			})
			.catch((error) => {
				console.error('Error deleting users:', error);
			});
	} catch (e) {
		console.log(e.message);
	}
}

async function closeConnection() {
	mongoose.connection.close();
}

async function pet_populate(species, petcode, name, description, in_gallery, affection, temper) {
	try {
		let entry = new Pet({ species: species, petcode: petcode, name: name, description: description, in_gallery: in_gallery, affection: affection, temper: temper});
		await entry.save();
		console.log('Pet successfully created.');
	} catch (e) {
		console.log(e.message);
	}
}

async function pet_populate_attr(petcode, maintenance, temper) {
	try {
		const entry = await Pet.findOne({petcode: petcode});

		if (entry){
			entry.maintenance = maintenance;
			entry.temper = temper;
			await entry.save();
			console.log('Pet successfully updated.');
		}  else  {
			console.log('Pet does not exist :(((((');
		}
	} catch (e) {
		console.log(e.message);
	}
}

module.exports = {
	userPopulate,
	usersDelete,
	closeConnection,
	pet_populate,
	pet_populate_attr,
};
