
import { useState } from "react";
import "./MyProducts.css";

function MyProducts() {
  // Products list
  const [products, setProducts] = useState([
    // CLEANERS
    {
      id: 1,
      name: "Hydrating Facial Cleanser",
      brand: "CeraVe",
      type: "Cleanser",
      image: "/products/ceravecleanser.jpeg",
    },
    {
      id: 2,
      name: "Toleriane Purifying Cleanser",
      brand: "La Roche-Posay",
      type: "Cleanser",
      image: "/products/cleanser.jpeg",
    },
    {
      id: 3,
      name: "Low pH Good Morning Gel Cleanser",
      brand: "COSRX",
      type: "Cleanser",
      image: "/products/cleanser.jpg",
    },

    // MOISTURIZERS
    {
      id: 4,
      name: "Daily Moisturizing Lotion",
      brand: "CeraVe",
      type: "Moisturizer",
      image: "/products/mostorising.png",
    },
    {
      id: 5,
      name: "Toleriane Double Repair Moisturizer",
      brand: "La Roche-Posay",
      type: "Moisturizer",
      image: "/products/laroshemostorising.jpeg",
    },
    {
      id: 6,
      name: "Advanced Snail 92 All In One Cream",
      brand: "COSRX",
      type: "Moisturizer",
      image: "/products/laroshe.jpeg",
    },

    // SERUMS
    {
      id: 7,
      name: "Hyaluronic Acid 2% + B5",
      brand: "The Ordinary",
      type: "Serum",
      image: "/products/hyaluronic.jpeg",
    },
    {
      id: 8,
      name: "Vitamin C Serum",
      brand: "La Roche-Posay",
      type: "Serum",
      image: "/products/vitaminc.jpeg",
    },
    {
      id: 9,
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      type: "Serum",
      image: "/products/Serumneacenamide.jpeg",
    },

    // TONERS
    {
      id: 10,
      name: "Hydrating Toner",
      brand: "CeraVe",
      type: "Toner",
      image: "/products/TonerCerave.jpeg",
    },
    {
      id: 11,
      name: "Supple Preparation Facial Toner",
      brand: "Klairs",
      type: "Toner",
      image: "/products/toner1.jpeg",
    },
    {
      id: 12,
      name: "AHA/BHA Clarifying Toner",
      brand: "COSRX",
      type: "Toner",
      image: "/products/toner2.jpeg",
    },
  ]);

  // Search state
  const [search, setSearch] = useState("");

  // Filter products according to search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Remove a product
  function deleteProduct(id) {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  }

  return (
    <div className="products-page">

      {/* HEADER */}
      <section className="products-header">
        <div>
          <p className="collection-title">
            YOUR SKINCARE COLLECTION
          </p>

          <h1>My Products</h1>

          <p className="description">
            Keep all your favorite skincare products
            organized in one place.
          </p>
        </div>

        <div className="header-rose">🌹</div>
      </section>


      {/* SEARCH AND COUNT */}
      <section className="products-tools">

        <div className="products-count">
          📦 {products.length} Products
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

      </section>


      {/* PRODUCTS */}
      <section className="products-grid">

        {filteredProducts.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            {/* PRODUCT IMAGE */}
            <div className="product-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>


            {/* PRODUCT INFORMATION */}
            <div className="product-info">

              <span className="product-type">
                {product.type}
              </span>

              <h2>{product.name}</h2>

              <p>{product.brand}</p>

              <button
                className="remove-button"
                onClick={() => deleteProduct(product.id)}
              >
                🗑 Remove
              </button>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
}

export default MyProducts;
