const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Nava order place karan layi API
router.post('/place', async (req, res) => {
  try {
    const newOrder = new Order({
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });
    const savedOrder = await newOrder.save();
    
    // Order successful hon te Frontend nu message te ID bhejna
    res.status(201).json({ message: "Order Successful!", orderId: savedOrder._id });
  } catch (error) {
    res.status(500).json({ error: "Order save karan vich error aaya" });
  }
});

module.exports = router;