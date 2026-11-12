
import { useState } from "react";
import "./myProducts.css";

function MyProducts() {
  // Products list
  const [products, setProducts] = useState([
    // CLEANSERS
    {
      id: 1,
      name: "Hydrating Facial Cleanser",
      brand: "CeraVe",
      type: "Cleanser",
       price: 15,
      image: "/products/ceravecleanser.jpeg",
    },
    {
      id: 2,
      name: "Toleriane Purifying Cleanser",
      brand: "La Roche-Posay",
      type: "Cleanser",
        price: 18,
      image: "/products/cleanser.jpeg",
    },
    {
      id: 3,
      name: "Low pH Good Morning Gel Cleanser",
      brand: "COSRX",
      type: "Cleanser",
        price: 14,
      image: "/products/cleanser.jpg",
    },

    // MOISTURIZERS
    {
      id: 4,
      name: "Daily Moisturizing Lotion",
      brand: "CeraVe",
      type: "Moisturizer",
        price: 17,
      image: "/products/mostorising.png",
    },
    {
      id: 5,
      name: "Toleriane Double Repair Moisturizer",
      brand: "La Roche-Posay",
      type: "Moisturizer",
        price: 20,
      image: "/products/laroshemostorising.jpeg",
    },
    {
      id: 6,
      name: "Advanced Snail 92 All In One Cream",
      brand: "COSRX",
      type: "Moisturizer",
        price: 19,
      image: "/products/laroshe.jpeg",
    },

    // SERUMS
    {
      id: 7,
      name: "Hyaluronic Acid 2% + B5",
      brand: "The Ordinary",
      type: "Serum",
        price: 12,
      image: "/products/hyaluronic.jpeg",
    },
    {
      id: 8,
      name: "Vitamin C Serum",
      brand: "La Roche-Posay",
      type: "Serum",
        price: 22,
      image: "/products/vitaminc.jpeg",
    },
    {
      id: 9,
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      type: "Serum",
        price: 11,
      image: "/products/Serumneacenamide.jpeg",
    },

    // TONERS
    {
      id: 10,
      name: "Hydrating Toner",
      brand: "CeraVe",
      type: "Toner",
        price: 16,
      image: "/products/TonerCerave.jpeg",
    },
    {
      id: 11,
      name: "Supple Preparation Facial Toner",
      brand: "Klairs",
      type: "Toner",
        price: 18,
      image: "/products/toner1.jpeg",
    },
    {
      id: 12,
      name: "AHA/BHA Clarifying Toner",
      brand: "COSRX",
      type: "Toner",
        price: 15,
      image: "/products/toner2.jpeg",
    },
  ]);

  // Search and category states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
const [cart, setCart] = useState([]);
  // Add product form states
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newType, setNewType] = useState("Cleanser");

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  const totalPrice = cart.reduce(
  (total, product) => total + product.price,
  0
);

  // Delete product with confirmation
  function deleteProduct(id) {
    const isSure = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!isSure) {
      return;
    }

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  }
  function addToCart(product) {
  setCart([...cart, product]);
}

  // Add a new product
  function addProduct() {
    if (!newName.trim() || !newBrand.trim()) {
      alert("Please enter product name and brand.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: newName.trim(),
      brand: newBrand.trim(),
      type: newType,
      image: "/products/mostorising.png",
    };

    setProducts([...products, newProduct]);

    setNewName("");
    setNewBrand("");
    setNewType("Cleanser");
    setShowForm(false);
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
      </section>

      {/* CATEGORY FILTER */}
      <div className="category-filter">
        {[
          "All",
          "Cleanser",
          "Moisturizer",
          "Serum",
          "Toner",
        ].map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category ? "active" : ""
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* SEARCH AND COUNT */}
      <section className="products-tools">
        <div className="products-count">
          {products.length} Products
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button
          type="button"
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Product
        </button>
      </section>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <div className="add-product-form">
          <h2>Add New Product</h2>

          <input
            type="text"
            placeholder="Product name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Brand"
            value={newBrand}
            onChange={(event) => setNewBrand(event.target.value)}
          />

          <select
            value={newType}
            onChange={(event) => setNewType(event.target.value)}
          >
            <option value="Cleanser">Cleanser</option>
            <option value="Moisturizer">Moisturizer</option>
            <option value="Serum">Serum</option>
            <option value="Toner">Toner</option>
            <option value="Sunscreen">Sunscreen</option>
          </select>

          <button type="button" onClick={addProduct}>
            Save Product
          </button>
        </div>
      )}
{/* SHOPPING CART */}
<section className="cart-summary">
  <h2>My Shopping Cart </h2>

  <p>Items in cart: {cart.length}</p>

  <h3>
    Total: ${totalPrice.toFixed(2)}
  </h3>
</section>
      {/* PRODUCTS */}
      <section className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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

                <p>{product.brand}</p>

<p className="product-price">

  ${product.price.toFixed(2)}
</p>

<div className="product-actions">
  <button
    type="button"
    className="remove-button"
    onClick={() => deleteProduct(product.id)}
  >
    Remove
  </button>

  <button
    type="button"
    className="cart-button"
    onClick={() => addToCart(product)}
  >
    Add to Cart
  </button>
</div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </section>

    </div>
  );
}

export default MyProducts;
