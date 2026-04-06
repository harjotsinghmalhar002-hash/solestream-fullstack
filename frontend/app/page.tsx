"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 🆕 Category State (Default 'All' select hovega)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Men", "Women", "Kids", "Slippers"];

  useEffect(() => {
    fetch("http://localhost:5000/api/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  const addToCart = (shoe: any) => setCart([...cart, shoe]);
  const removeFromCart = (indexToRemove: number) => setCart(cart.filter((_, index) => index !== indexToRemove));
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart khali hai!");
    try {
      const response = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, totalAmount: totalPrice })
      });
      const data = await response.json();
      if (response.ok) {
        alert(`✅ Congratulations! Tuhada Order Place ho gaya hai.\nOrder ID: ${data.orderId}`);
        setCart([]); setIsCartOpen(false);
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  // 🆕 Filter Logic: Jo category select kiti hai, sirf ohi shoes dikhao
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(shoe => shoe.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans relative">
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">SOLE<span className="text-blue-600">STREAM</span></h1>
        <div onClick={() => setIsCartOpen(true)} className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-full shadow-md cursor-pointer hover:bg-gray-800 transition">
          <span className="text-xl">🛒</span>
          <span className="font-bold text-lg">Cart ({cart.length})</span>
        </div>
      </div>

      {/* 🆕 Category Filter Buttons */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm ${
              selectedCategory === category 
                ? "bg-blue-600 text-white scale-105" 
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Products Grid (Hun .map products di jagah filteredProducts te chalega) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 font-bold text-xl col-span-3 text-center mt-10">Is category vich hale koi product nahi hai.</p>
        ) : (
          filteredProducts.map((shoe) => (
            <div key={shoe._id} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="overflow-hidden rounded-2xl mb-5">
                <img src={shoe.images[0]} alt={shoe.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">{shoe.name}</h2>
                  <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mt-1">{shoe.brand} | {shoe.category}</p>
                </div>
                <p className="text-2xl font-black text-gray-900">₹{shoe.price}</p>
              </div>
              <button onClick={() => addToCart(shoe)} className="w-full mt-5 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg">
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cart Modal (Pehlan wala hi hai) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-96 h-full p-6 shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-black">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-red-500 font-extrabold text-2xl hover:scale-110 transition">✕</button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center mt-20">
                <p className="text-5xl mb-4">👟</p>
                <p className="text-gray-500 text-lg font-medium">Your cart is empty!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-green-600 font-bold text-sm">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-red-500 text-sm font-bold hover:underline">Remove</button>
                  </div>
                ))}
                <div className="border-t-2 border-dashed mt-4 pt-6">
                  <div className="flex justify-between items-center font-black text-2xl mb-6">
                    <span>Total:</span><span className="text-green-600">₹{totalPrice}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full bg-green-500 text-white py-4 rounded-xl font-black text-lg hover:bg-green-600 active:scale-95 transition-all shadow-lg">
                    Checkout Securely
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}