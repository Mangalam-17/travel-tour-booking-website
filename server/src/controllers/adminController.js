const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const User = require('../models/User');
const Tour = require('../models/Tour');
const HeroSlide = require('../models/HeroSlide');

// GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalBookings, revenueResult, totalContacts,
      unreadContacts, totalUsers, totalTours, recentBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.aggregate([{ $match: { status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      User.countDocuments(),
      Tour.countDocuments(),
      Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    res.json({ success: true, data: { totalBookings, totalRevenue: revenueResult[0]?.total || 0, totalContacts, unreadContacts, totalUsers, totalTours, recentBookings } });
  } catch (error) {
    console.error('getDashboardStats error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching stats' });
  }
};

// GET /api/admin/bookings
const getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Booking.countDocuments(),
    ]);
    res.json({ success: true, data: bookings, pagination: { total, page, pages: Math.ceil(total / limit), limit } });
  } catch (error) {
    console.error('getAllBookings error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
};

// PATCH /api/admin/bookings/:id
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed', 'pending', 'cancelled'].includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('updateBookingStatus error:', error);
    res.status(500).json({ success: false, message: 'Server error updating booking' });
  }
};

// GET /api/admin/contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('getAllContacts error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching contacts' });
  }
};

// PATCH /api/admin/contacts/:id
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'replied'].includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('updateContactStatus error:', error);
    res.status(500).json({ success: false, message: 'Server error updating contact' });
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('getAllUsers error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};

// ── Tour CRUD ────────────────────────────────────────────────────

// GET /api/admin/tours
const getAllToursAdmin = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: tours.length, data: tours });
  } catch (error) {
    console.error('getAllToursAdmin error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching tours' });
  }
};

// POST /api/admin/tours
const createTour = async (req, res) => {
  try {
    const { title, destination, country, images, description, price, rating, duration, tourType, highlights, facilities, itinerary } = req.body;
    if (!title || !destination || !country || !price)
      return res.status(400).json({ success: false, message: 'Title, destination, country and price are required' });

    const tour = await Tour.create({ title, destination, country, images: images || [], description, price, rating: rating || 0, duration, tourType, highlights: highlights || [], facilities: facilities || [], itinerary: itinerary || [] });
    res.status(201).json({ success: true, message: 'Tour created successfully', data: tour });
  } catch (error) {
    console.error('createTour error:', error);
    res.status(500).json({ success: false, message: 'Server error creating tour' });
  }
};

// PUT /api/admin/tours/:id
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour updated successfully', data: tour });
  } catch (error) {
    console.error('updateTour error:', error);
    res.status(500).json({ success: false, message: 'Server error updating tour' });
  }
};

// DELETE /api/admin/tours/:id
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ success: false, message: 'Tour not found' });
    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    console.error('deleteTour error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting tour' });
  }
};

module.exports = {
  getDashboardStats, getAllBookings, updateBookingStatus,
  getAllContacts, updateContactStatus, getAllUsers,
  getAllToursAdmin, createTour, updateTour, deleteTour,
  // Hero slides
  getHeroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide,
};

// ── Hero Slide CRUD ──────────────────────────────────────────────

async function getHeroSlides(req, res) {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function createHeroSlide(req, res) {
  try {
    const { image, title, subtitle, tag, order, isActive } = req.body;
    if (!image || !title)
      return res.status(400).json({ success: false, message: 'Image and title are required' });
    // Set order to last if not provided
    const count = await HeroSlide.countDocuments();
    const slide = await HeroSlide.create({
      image, title, subtitle: subtitle || '', tag: tag || '',
      order: order !== undefined ? order : count,
      isActive: isActive !== undefined ? isActive : true,
    });
    res.status(201).json({ success: true, data: slide });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function updateHeroSlide(req, res) {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!slide) return res.status(404).json({ success: false, message: 'Slide not found' });
    res.json({ success: true, data: slide });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function deleteHeroSlide(req, res) {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ success: false, message: 'Slide not found' });
    res.json({ success: true, message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
