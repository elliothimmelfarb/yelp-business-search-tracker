const express = require('express');
const router = new express.Router();

const Yelp = require('yelp');
const Business = require('../models/business');

const yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});

router.get('/business/:id', (req, res) => {
  yelp.business(req.params.id)
    .then(data => {
      Business.findOne({ yelpId: data.id }, (err, dbBusiness) => {
        if (err) return res.status(400).send(err);
        /* eslint-disable no-param-reassign */
        if (dbBusiness) data.favorited = dbBusiness.favorited;
        else data.favorited = 0;
        /* eslint-enable no-param-reassign */
        return res.status(200).send(data);
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/search', (req, res) => {
  yelp.search(req.body)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
