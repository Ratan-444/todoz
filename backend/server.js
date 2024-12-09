require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');  // Assuming you have a route file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://todoz-tkr9.vercel.app', // Allow your frontend's domain
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Add required headers
}));
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
  socketTimeoutMS: 45000          // Prevents connections from hanging indefinitely
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
