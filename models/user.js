const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Business = require('./business');


const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  favorites: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
});


userSchema.pre('save', PreSave);

userSchema.methods.generateToken = generateToken;
userSchema.methods.addFavorite = addFavorite;
userSchema.methods.removeFavorite = removeFavorite;

userSchema.statics.authMiddleware = authMiddleware;
userSchema.statics.findUserById = findUserById;
userSchema.statics.authenticate = authenticate;
userSchema.statics.register = register;


let User = {};


function addFavorite(yelpId, cb) {
  Business.findOne({ yelpId }, (err, dbBusiness) => {
    if (err) return cb(err);
    if (!dbBusiness) {
      return Business.create({ yelpId }, (err, newBusiness) => {
        if (err) return cb(err);
        this.favorites.push(newBusiness._id);
        return this.save(err => cb(err));
      });
    }
    dbBusiness.favorited++; // eslint-disable-line no-param-reassign
    return dbBusiness.save(err => {
      if (err) return cb(err);
      this.favorites.push(dbBusiness);
      return this.save(err => cb(err));
    });
  });
}

function removeFavorite(yelpId, cb) {
  Business.findOne({ yelpId }, (err, dbBusiness) => {
    if (err) return cb(err);
    if (!dbBusiness) return cb({ error: 'Business not found' });
    dbBusiness.favorited--; // eslint-disable-line
    return dbBusiness.save(err => {
      if (err) return cb(err);
      return this.update({ pull: { favorites: dbBusiness._id } }, err => cb(err));
    });
  });
}


function PreSave(next) {
  if (!this.isModified('password')) {
    return next();
  }
  return bcrypt.hash(this.password, 12, (err, hash) => {
    this.password = hash;
    next();
  });
}


function generateToken() {
  const payload = {
    _id: this.id,
    username: this.username,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1 day' });
  return token;
}


function authMiddleware(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) return res.status(401).send({ error: 'Missing authorization header.' });
  const token = tokenHeader.split(' ')[1];

  return jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).send(err);

    return User.findById(payload._id)
      .select('-password')
      .exec((err, dbUser) => {
        if (err || !dbUser) return res.status(401).send(err || { error: 'User not found.' });
        req.user = dbUser; // eslint-disable-line no-param-reassign
        return next();
      });
  });
}


function findUserById(id, cb) {
  User.findById(id)
  .select('-password')
  .exec((err, user) => {
    if (err || !user) return cb(err || { error: 'User not found.' });
    return cb(null, user);
  });
}


function authenticate(userObj, cb) {
  User.findOne({ email: userObj.email }, (err, user) => {
    if (err || !user) return cb(err || { error: 'Invalid email or password' });
    return bcrypt.compare(userObj.password, user.password, (err, isGood) => {
      if (err || !isGood) return cb(err || { error: 'Invalid email or password' });
      const token = user.generateToken();
      return cb(null, token);
    });
  });
}


function register(userObj, cb) {
  User.findOne({ username: userObj.username }, (err, user) => {
    if (err || user) return cb(err || { error: 'Username already taken' });
    return User.create(userObj, (err, savedUser) => {
      if (err) return cb(err);
      const token = savedUser.generateToken();
      return cb(null, token);
    });
  });
}


User = mongoose.model('User', userSchema);
module.exports = User;
