const mongoose = require('mongoose');


const businessSchema = new mongoose.Schema({
  yelpId: { type: String, required: true },
  favorited: { type: Number, default: 1, min: 0 },
  createdAt: { type: Date, default: Date.now },
  yelpData: { type: Object },
});

businessSchema.methods.favorite = favorite;
businessSchema.methods.favorite = unfavorite;

function favorite(cb) {
  this.favorited++;
  this.save(err => {
    cb(err);
  });
}
function unfavorite(cb) {
  this.favorited--;
  this.save(err => {
    cb(err);
  });
}


const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
