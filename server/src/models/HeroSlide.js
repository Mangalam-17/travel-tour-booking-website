const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  image:    { type: String, required: true },
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
  tag:      { type: String, default: '' },
  order:    { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
