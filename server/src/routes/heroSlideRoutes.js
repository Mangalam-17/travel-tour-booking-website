const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');

/**
 * @swagger
 * tags:
 *   name: HeroSlides
 *   description: Public hero carousel slides
 */

/**
 * @swagger
 * /api/hero-slides:
 *   get:
 *     summary: Get active hero slides (public)
 *     tags: [HeroSlides]
 *     responses:
 *       200:
 *         description: Active slides sorted by order
 */
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
