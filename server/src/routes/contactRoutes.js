const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form messages
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Submit a contact message
 *     description: Anyone can submit a contact message. No authentication required.
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, subject, message]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Priya Sharma
 *               email:
 *                 type: string
 *                 example: priya@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *                 description: Optional — 10 digits
 *               subject:
 *                 type: string
 *                 example: Booking Support
 *               message:
 *                 type: string
 *                 minLength: 20
 *                 example: I need help with my upcoming Rajasthan tour booking.
 *     responses:
 *       201:
 *         description: Message received successfully
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
 *                   example: Message received successfully
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation error
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
router.post('/', createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contact messages (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all contact messages
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
 *                     $ref: '#/components/schemas/Contact'
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
router.get('/', protect, adminOnly, getAllContacts);

module.exports = router;
