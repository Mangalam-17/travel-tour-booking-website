const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day:         { type: Number, required: true },
  title:       { type: String, required: true },
  description: { type: String },
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  avatar:  { type: String },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date:    { type: String },
});

const tourSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  destination: { type: String, required: true },
  country:     { type: String, required: true },
  images:      [{ type: String }],
  description: { type: String },
  price:       { type: Number, required: true },
  rating:      { type: Number, default: 0 },
  duration:    { type: String },
  tourType:    { type: String },
  highlights:  [{ type: String }],
  facilities:  [{ type: String }],
  itinerary:   [itinerarySchema],
  reviews:     [reviewSchema],
}, { timestamps: true });

// Text index for search
tourSchema.index({ title: 'text', destination: 'text', country: 'text' });

module.exports = mongoose.model('Tour', tourSchema);
