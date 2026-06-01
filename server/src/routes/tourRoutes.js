const express = require('express');
const router = express.Router();
const { getAllTours, getTourById } = require('../controllers/tourController');

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: Tour packages — browse and filter Indian destinations
 */

/**
 * @swagger
 * /api/tours:
 *   get:
 *     summary: Get all tours
 *     description: Returns all tours. Supports filtering by search, tourType, price range, rating, and sorting.
 *     tags: [Tours]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title, destination, or country
 *         example: Rajasthan
 *       - in: query
 *         name: tourType
 *         schema:
 *           type: string
 *           enum: [Adventure, Heritage, Family, Honeymoon, Beach, Wildlife, Spiritual]
 *         description: Filter by tour type
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price in ₹
 *         example: 5000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price in ₹
 *         example: 50000
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         description: Minimum rating (e.g. 4.5)
 *         example: 4.5
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price-asc, price-desc, rating, default]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 12
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tour'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllTours);

/**
 * @swagger
 * /api/tours/{id}:
 *   get:
 *     summary: Get a single tour by ID
 *     description: Returns full tour details including itinerary and reviews.
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the tour
 *         example: 6a1d4365acfa66eb881700cb
 *     responses:
 *       200:
 *         description: Tour details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Tour'
 *       404:
 *         description: Tour not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getTourById);

module.exports = router;
