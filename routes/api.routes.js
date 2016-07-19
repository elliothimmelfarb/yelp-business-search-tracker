const express = require('express');

const router = new express.Router();

router.use('/users', require('./users.routes'));
router.use('/yelp', require('./yelp.routes'));

module.exports = router;
