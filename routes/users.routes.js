const express = require('express');
const router = new express.Router();
const User = require('../models/user');
// const request = require('request');

router.put('/:userId/addFavorite/:businessId', (req, res) => {
  User.findById(req.params.userId, (err, dbUser) => {
    if (err) return res.status(400).send(err);
    return dbUser.addFavorite(req.params.businessId, err => {
      res.status(err ? 400 : 200).send(err);
    });
  });
});

router.delete('/:userId/removeFavorite/:businessId', (req, res) => {
  User.findById(req.params.userId, (err, dbUser) => {
    if (err) return res.status(400).send(err);
    return dbUser.removeFavorite(req.params.businessId, err => {
      res.status(err ? 400 : 200).send(err);
    });
  });
});

router.get('/', (req, res) => {
  User.find({})
  .select('-password')
  .exec((err, dbUsers) => {
    res.status(err ? 400 : 200).send(err || dbUsers);
  });
});

router.get('/profile', User.authMiddleware, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.get('/:id', (req, res) => {
  User.findUserById(req.params.id, (err, dbUser) => {
    res.status(err ? 400 : 200).send(err || dbUser);
  });
});

router.post('/register', (req, res) => {
  User.find({ email: req.body.email }, (err, dbUser) => {
    if (err) return res.status(400).send(err);
    if (dbUser.email) return res.status(401).send({ error: 'Email already in use.' });
    return User.create(req.body, (err, dbUser) => {
      res.send(dbUser);
    });
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    res.status(err ? 400 : 200).send(err || { token });
  });
});


router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, dbUser) => {
    const user = dbUser;
    user.password = null;
    res.status(err ? 400 : 200).send(err || user);
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;
