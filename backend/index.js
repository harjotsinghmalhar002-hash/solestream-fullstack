const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Routes Import (Dhyaan rakho, dono ek-ek vaar hi han)
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); 

const app = express();

// 2. Middleware
app.use(express.json()); 
app.use(cors());

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Sahi Tarike Naal Connect Ho Gaya Hai!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// 4. API Routes nu use karna
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('SoleStream Backend Chal Reha Hai 🚀');
});

// 5. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} te chal reha hai`);
});