const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        if (!req.session.userId) { res.redirect('/login_route'); }
        res.render('search', { title: "Pet Search" });
    } catch (err) {
        console.error('Error in search page:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;