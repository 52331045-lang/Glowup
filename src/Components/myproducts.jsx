
import { useState } from "react";
import "./myProducts.css";

function MyProducts() {
  // PRODUCTS LIST
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

  // SEARCH AND CATEGORY
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // SHOPPING CART
  const [cart, setCart] = useState([]);

  // CHECKOUT
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ADD PRODUCT FORM
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newType, setNewType] = useState("Cleanser");
  const [newPrice, setNewPrice] = useState("");

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // CALCULATE CART TOTAL
  const totalPrice = cart.reduce(
    (total, product) => total + Number(product.price),
    0
  );

  // DELETE PRODUCT
  function deleteProduct(id) {
    const isSure = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!isSure) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );

    // Also remove it from the cart
    setCart((currentCart) =>
      currentCart.filter((product) => product.id !== id)
    );
  }

  // ADD TO CART
  function addToCart(product) {
    setCart((currentCart) => [...currentCart, product]);
  }

  // ADD NEW PRODUCT
  function addProduct() {
    if (
      !newName.trim() ||
      !newBrand.trim() ||
      !newPrice.trim() ||
      Number(newPrice) <= 0
    ) {
      alert("Please enter product name, brand and a valid price.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: newName.trim(),
      brand: newBrand.trim(),
      type: newType,
      price: Number(newPrice),
      image: "/products/mostorising.png",
    };

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    setNewName("");
    setNewBrand("");
    setNewType("Cleanser");
    setNewPrice("");
    setShowForm(false);
  }

  // PLACE ORDER
  function placeOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!deliveryAddress.trim() || !phoneNumber.trim()) {
      alert("Please enter your address and phone number.");
      return;
    }

    // Validate phone number
    if (!/^[0-9]+$/.test(phoneNumber)) {
      alert("Please enter a valid phone number using numbers only.");
      return;
    }

    const successMessage =
      paymentMethod === "Card"
        ? "Demo Card Payment Successful!"
        : "Order placed successfully! Pay on delivery.";

    alert(
      `${successMessage}\n
Payment: ${paymentMethod}\n
Address: ${deliveryAddress}\n
Phone: ${phoneNumber}\n
Total: $${totalPrice.toFixed(2)}`
    );

    setCart([]);
    setDeliveryAddress("");
    setPhoneNumber("");
    setPaymentMethod("Cash");
    setShowCheckout(false);
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
          "Sunscreen",
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

          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Product price in USD"
            value={newPrice}
            onChange={(event) => setNewPrice(event.target.value)}
          />

          <button type="button" onClick={addProduct}>
            Save Product
          </button>
        </div>
      )}

      {/* SHOPPING CART */}
      <section className="cart-summary">
        <h2>My Shopping Cart</h2>

        <p>Items in cart: {cart.length}</p>

        <h3>
          Total: ${totalPrice.toFixed(2)}
        </h3>

        <button
          type="button"
          className="checkout-button"
          onClick={() => setShowCheckout(true)}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </section>

      {/* CHECKOUT FORM */}
      {showCheckout && (
        <div className="checkout-form">
          <h2>Complete Your Order</h2>

          {/* PAYMENT OPTIONS */}
          <label>Choose Payment Method</label>

          <div className="payment-options">
            <button
              type="button"
              className={
                paymentMethod === "Cash" ? "selected" : ""
              }
              onClick={() => setPaymentMethod("Cash")}
            >
              Cash
            </button>

            <button
              type="button"
              className={
                paymentMethod === "Card" ? "selected" : ""
              }
              onClick={() => setPaymentMethod("Card")}
            >
              Card
            </button>
          </div>

          <label>Home Delivery Address</label>

          <textarea
            placeholder="Enter your full home address..."
            value={deliveryAddress}
            onChange={(event) =>
              setDeliveryAddress(event.target.value)
            }
          />

          <label>Phone Number</label>

          <input
            type="tel"
            inputMode="numeric"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(event) =>
              setPhoneNumber(
                event.target.value.replace(/[^0-9]/g, "")
              )
            }
          />

          <button
            type="button"
            className="checkout-button"
            onClick={placeOrder}
          >
            Place Order
          </button>

          <button
            type="button"
            className="remove-button"
            onClick={() => setShowCheckout(false)}
          >
            Cancel
          </button>
        </div>
      )}

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
