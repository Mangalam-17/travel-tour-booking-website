const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const User = require('../models/User');
const Tour = require('../models/Tour');

// GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalBookings,
      revenueResult,
      totalContacts,
      unreadContacts,
      totalUsers,
      totalTours,
      recentBookings,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      User.countDocuments(),
      Tour.countDocuments(),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      success: true,
      data: {
        totalBookings,
        totalRevenue,
        totalContacts,
        unreadContacts,
        totalUsers,
        totalTours,
        recentBookings,
      },
    });
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
      Booking.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Booking.countDocuments(),
    ]);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error('getAllBookings error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching bookings' });
  }
};

// PATCH /api/admin/bookings/:id
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['confirmed', 'pending', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

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
    const validStatuses = ['unread', 'read', 'replied'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

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

module.exports = {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  getAllContacts,
  updateContactStatus,
  getAllUsers,
};
