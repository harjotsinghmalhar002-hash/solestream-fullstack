const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, default: "Guest User" },
  items: { type: Array, required: true }, // Cart wale shoes
  totalAmount: { type: Number, required: true }, // Total Bill
  status: { type: String, default: "Order Placed" }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);