const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Tour booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Requires a valid JWT token. Calculates total amount from tour price × guests.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tourId, fullName, email, phone, travelDate, guests]
 *             properties:
 *               tourId:
 *                 type: string
 *                 example: 6a1d4365acfa66eb881700cb
 *               fullName:
 *                 type: string
 *                 example: Rahul Sharma
 *               email:
 *                 type: string
 *                 example: rahul@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               travelDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-15"
 *               guests:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 20
 *                 example: 2
 *     responses:
 *       201:
 *         description: Booking confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Booking confirmed successfully
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation error (missing fields or past date)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized — login required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
router.post('/', protect, createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', protect, adminOnly, getAllBookings);

module.exports = router;
