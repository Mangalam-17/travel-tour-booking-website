const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getAllContacts,
  updateContactStatus,
  getAllUsers,
} = require('../controllers/adminController');

// All routes require authentication + admin role
router.use(protect, adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only endpoints — require Bearer token with admin role
 */

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalBookings:
 *                       type: number
 *                       example: 24
 *                     totalRevenue:
 *                       type: number
 *                       example: 482000
 *                     totalContacts:
 *                       type: number
 *                       example: 10
 *                     unreadContacts:
 *                       type: number
 *                       example: 3
 *                     totalUsers:
 *                       type: number
 *                       example: 120
 *                     totalTours:
 *                       type: number
 *                       example: 12
 *                     recentBookings:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Booking'
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
router.get('/stats', getDashboardStats);

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     summary: Get all bookings with pagination
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Results per page (default 20)
 *         example: 20
 *     responses:
 *       200:
 *         description: Paginated list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:  { type: number, example: 24 }
 *                     page:   { type: number, example: 1 }
 *                     pages:  { type: number, example: 2 }
 *                     limit:  { type: number, example: 20 }
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/bookings', getAllBookings);

/**
 * @swagger
 * /api/admin/bookings/{id}:
 *   patch:
 *     summary: Update booking status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [confirmed, pending, cancelled]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Booking status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid status value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/bookings/:id', updateBookingStatus);

/**
 * @swagger
 * /api/admin/contacts:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Admin]
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 */
router.get('/contacts', getAllContacts);

/**
 * @swagger
 * /api/admin/contacts/{id}:
 *   patch:
 *     summary: Update contact message status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [unread, read, replied]
 *                 example: read
 *     responses:
 *       200:
 *         description: Contact status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid status value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/contacts/:id', updateContactStatus);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all registered users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/users', getAllUsers);

module.exports = router;
