const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.status(400).send('Unable to log out');
			} else {
				res.redirect('/login_route');
			}
		});
	} else {
		res.end();
	}
});

module.exports = router;