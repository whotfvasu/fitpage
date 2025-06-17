import React, { useEffect, useState } from "react";
import { fetchProducts, fetchUsers } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, usersData] = await Promise.all([
          fetchProducts(),
          fetchUsers(),
        ]);
        setProducts(productsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading data:", error);
        setErrorMessage("Failed to load data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleProductClick = (productId) => {
    if (!selectedUser) {
      setErrorMessage("Please select a user before proceeding.");
      window.scrollTo(0, 0);
      return;
    }
    setErrorMessage("");
    navigate(`/product/${productId}?userId=${selectedUser.id}`);
  };

  if (loading) {
    return (
      <div className="home-container">
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Running Accessories</h1>

      <div className="user-selection">
        <h3>Select User</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <select
          className="user-select"
          onChange={(e) => {
            const userId = parseInt(e.target.value);
            setSelectedUser(users.find((user) => user.id === userId));
            setErrorMessage(""); // Clear error when user makes a selection
          }}
          value={selectedUser ? selectedUser.id : ""}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-image">
              <img src={product.image_url} alt={product.name} />
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
