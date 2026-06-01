const Tour = require('../models/Tour');

// GET /api/tours
// Query params: search, tourType, minPrice, maxPrice, rating, sortBy
const getAllTours = async (req, res) => {
  try {
    const { search, tourType, minPrice, maxPrice, rating, sortBy } = req.query;

    const query = {};

    // Search across title, destination, country
    if (search) {
      query.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { country:     { $regex: search, $options: 'i' } },
      ];
    }

    // Tour type filter
    if (tourType && tourType !== 'All') {
      query.tourType = tourType;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Min rating filter
    if (rating && Number(rating) > 0) {
      query.rating = { $gte: Number(rating) };
    }

    // Sorting
    let sortOption = { _id: 1 }; // default
    if (sortBy === 'price-asc')  sortOption = { price:  1 };
    if (sortBy === 'price-desc') sortOption = { price: -1 };
    if (sortBy === 'rating')     sortOption = { rating: -1 };

    const tours = await Tour.find(query).sort(sortOption);
    res.json({ success: true, count: tours.length, data: tours });
  } catch (error) {
    console.error('getAllTours error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/tours/:id
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    res.json({ success: true, data: tour });
  } catch (error) {
    console.error('getTourById error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAllTours, getTourById };
