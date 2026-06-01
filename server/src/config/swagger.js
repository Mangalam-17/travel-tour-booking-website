const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Roamly API',
      version: '1.0.0',
      description: 'REST API for Roamly — Indian Travel & Tour Booking Platform',
      contact: {
        name: 'Roamly Team',
        email: 'hello@roamly.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token. Get it from POST /api/auth/login',
        },
      },
      schemas: {
        Tour: {
          type: 'object',
          properties: {
            _id:         { type: 'string', example: '6a1d4365acfa66eb881700cb' },
            title:       { type: 'string', example: 'Rajasthan Royal Heritage' },
            destination: { type: 'string', example: 'Jaipur' },
            country:     { type: 'string', example: 'India' },
            images:      { type: 'array', items: { type: 'string' }, example: ['https://images.unsplash.com/...'] },
            description: { type: 'string' },
            price:       { type: 'number', example: 24999 },
            rating:      { type: 'number', example: 4.9 },
            duration:    { type: 'string', example: '8 Days / 7 Nights' },
            tourType:    { type: 'string', example: 'Heritage' },
            highlights:  { type: 'array', items: { type: 'string' } },
            facilities:  { type: 'array', items: { type: 'string' } },
            itinerary: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day:         { type: 'number', example: 1 },
                  title:       { type: 'string', example: 'Arrival in Jaipur' },
                  description: { type: 'string' },
                },
              },
            },
            reviews: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id:     { type: 'string' },
                  name:    { type: 'string', example: 'Rahul Verma' },
                  avatar:  { type: 'string' },
                  rating:  { type: 'number', example: 5 },
                  comment: { type: 'string' },
                  date:    { type: 'string', example: 'March 2024' },
                },
              },
            },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            _id:           { type: 'string' },
            tourId:        { type: 'string', example: '6a1d4365acfa66eb881700cb' },
            tourTitle:     { type: 'string', example: 'Rajasthan Royal Heritage' },
            fullName:      { type: 'string', example: 'Rahul Sharma' },
            email:         { type: 'string', example: 'rahul@example.com' },
            phone:         { type: 'string', example: '9876543210' },
            travelDate:    { type: 'string', format: 'date', example: '2024-12-15' },
            guests:        { type: 'number', example: 2 },
            pricePerPerson:{ type: 'number', example: 24999 },
            totalAmount:   { type: 'number', example: 49998 },
            status:        { type: 'string', enum: ['confirmed', 'pending', 'cancelled'], example: 'confirmed' },
            createdAt:     { type: 'string', format: 'date-time' },
          },
        },
        Contact: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            name:      { type: 'string', example: 'Priya Sharma' },
            email:     { type: 'string', example: 'priya@example.com' },
            phone:     { type: 'string', example: '9876543210' },
            subject:   { type: 'string', example: 'Booking Support' },
            message:   { type: 'string', example: 'I need help with my booking...' },
            status:    { type: 'string', enum: ['unread', 'read', 'replied'], example: 'unread' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            name:      { type: 'string', example: 'Arjun Mehta' },
            email:     { type: 'string', example: 'arjun@example.com' },
            role:      { type: 'string', enum: ['user', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message here' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
