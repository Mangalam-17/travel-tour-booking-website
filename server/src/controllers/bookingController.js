const Booking = require('../models/Booking');
const Tour = require('../models/Tour');

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { tourId, fullName, email, phone, travelDate, guests } = req.body;

    // Validate required fields
    if (!tourId || !fullName || !email || !phone || !travelDate || !guests) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Verify tour exists and get price
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }

    // Validate travel date is in the future
    if (new Date(travelDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Travel date must be in the future',
      });
    }

    const totalAmount = tour.price * Number(guests);

    const booking = await Booking.create({
      tourId,
      tourTitle: tour.title,
      fullName,
      email,
      phone,
      travelDate,
      guests: Number(guests),
      pricePerPerson: tour.price,
      totalAmount,
      status: 'confirmed',
    });

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking,
    });
  } catch (error) {
    console.error('createBooking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

// GET /api/bookings  (all bookings — useful for admin later)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tourId', 'title destination images')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error('getAllBookings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createBooking, getAllBookings };
