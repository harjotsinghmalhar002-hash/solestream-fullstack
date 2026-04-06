fetch('http://localhost:5000/api/products/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Nike Air Jordan 1",
    brand: "Nike",
    price: 15000,
    description: "Premium classic sneaker, red and white color.",
    sizes: [7, 8, 9, 10, 11],
    images: ["https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f"]
  })
})
.then(response => response.json())
.then(data => console.log("🟢 Server Response:", data))
.catch(error => console.error("🔴 Error:", error));