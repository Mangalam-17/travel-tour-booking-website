const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { upload, uploadToCloudinary } = require('../config/cloudinary');
const {
  getDashboardStats,
  getAllBookings, updateBookingStatus,
  getAllContacts, updateContactStatus,
  getAllUsers,
  getAllToursAdmin, createTour, updateTour, deleteTour,
  getHeroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide,
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

/**
 * @swagger
 * /api/admin/tours:
 *   get:
 *     summary: Get all tours (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tours
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 count: { type: number }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tour'
 *   post:
 *     summary: Create a new tour
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       201:
 *         description: Tour created
 *       400:
 *         description: Validation error
 *
 * /api/admin/tours/{id}:
 *   put:
 *     summary: Update a tour
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       200:
 *         description: Tour updated
 *       404:
 *         description: Tour not found
 *   delete:
 *     summary: Delete a tour
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour deleted
 *       404:
 *         description: Tour not found
 */
router.get('/tours', getAllToursAdmin);
router.post('/tours', createTour);
router.put('/tours/:id', updateTour);
router.delete('/tours/:id', deleteTour);

// ── Hero Slides ──────────────────────────────────────────────────
router.get('/hero-slides', getHeroSlides);
router.post('/hero-slides', createHeroSlide);
router.put('/hero-slides/:id', updateHeroSlide);
router.delete('/hero-slides/:id', deleteHeroSlide);

/**
 * @swagger
 * /api/admin/upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded — returns Cloudinary URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 url: { type: string, example: 'https://res.cloudinary.com/...' }
 *       400:
 *         description: No file uploaded or invalid format
 */
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }
    // Upload buffer directly to Cloudinary — returns secure_url guaranteed
    const url = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    res.json({ success: true, url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Upload failed' });
  }
});

module.exports = router;
