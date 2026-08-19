require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { testConnection } = require('./src/config/db');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

const authRoutes = require('./src/routes/authRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const faqRoutes = require('./src/routes/faqRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const taxCalendarRoutes = require('./src/routes/taxCalendarRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Core middleware ----------
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------- Health check ----------
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running.' });
});

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tax-calendar', taxCalendarRoutes);
app.use('/api/admin', adminRoutes);

// ---------- 404 + error handling ----------
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`[SERVER] Digital Tax Support API running on http://localhost:${PORT}`);
  await testConnection();
});
