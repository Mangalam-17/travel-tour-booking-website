require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/db');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const heroSlideRoutes = require('./routes/heroSlideRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS must be the very first middleware — before routes and everything else
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hero-slides', heroSlideRoutes);

// Swagger API Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Roamly API Docs',
  customCss: '.swagger-ui .topbar { background-color: #f97316; }',
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Roamly API is running 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
