const Contact = require('../models/Contact');

// POST /api/contacts
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject and message are required',
      });
    }

    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    if (message.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 20 characters',
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'unread',
    });

    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: contact,
    });
  } catch (error) {
    console.error('createContact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
};

// GET /api/contacts  (all messages — useful for admin later)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('getAllContacts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createContact, getAllContacts };
