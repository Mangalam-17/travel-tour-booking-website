require('dotenv').config();
const mongoose = require('mongoose');
const HeroSlide = require('./models/HeroSlide');

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80',
    title: 'Discover Rajasthan',
    subtitle: 'Land of Kings',
    tag: 'Heritage & Culture',
    order: 0,
    isActive: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1600&q=80',
    title: 'Kerala Backwaters',
    subtitle: "God's Own Country",
    tag: 'Nature & Serenity',
    order: 1,
    isActive: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80',
    title: 'Taj Mahal, Agra',
    subtitle: 'Wonder of the World',
    tag: 'Iconic India',
    order: 2,
    isActive: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80',
    title: 'Himachal Pradesh',
    subtitle: 'Adventure in the Himalayas',
    tag: 'Mountain Adventure',
    order: 3,
    isActive: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    const existing = await HeroSlide.countDocuments();
    if (existing > 0) {
      console.log(`ℹ️  Hero slides already seeded (${existing} found). Skipping.`);
      process.exit(0);
    }
    await HeroSlide.insertMany(slides);
    console.log(`🌱 Seeded ${slides.length} hero slides`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
