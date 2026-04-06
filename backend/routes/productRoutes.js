const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Jo schema aapa banaya c usnu import kita

// Pehla Route: Nava Product (Sneaker) Database vich add karna (POST Request)
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Frontend ton jo data aayega oh req.body vich hunda hai
    const savedProduct = await newProduct.save(); // Database vich save karna
    
    res.status(201).json({ message: "Sneaker successfully add ho gaya!", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Product add karan vich problem aayi", details: error });
  }
});
// Dooja Route: Database vicho saare Sneaker kadd ke liauna (GET Request)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find(); // Database vicho saare products fetch karna
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Products fetch karan vich problem aayi" });
  }
});
module.exports = router;