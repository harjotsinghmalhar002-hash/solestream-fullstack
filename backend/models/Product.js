const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  sizes: { type: [Number], required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true, default: "Men" }, // 🆕 Eh navi line add kitti hai
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);