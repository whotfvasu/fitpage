import axios from "axios";

// Get API URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// fetch all products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// fetch reviews for a product
export const fetchReviews = async (productId) => {
  try {
    const response = await apiClient.get(`/reviews/${productId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

// fetch ratings for a product
export const fetchRatings = async (productId) => {
  try {
    const response = await apiClient.get(`/ratings/${productId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

// fetch product details
export const fetchProductDetails = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// submit a new review
export const submitReview = async (reviewData) => {
  try {
    const response = await apiClient.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// submit a new rating
export const submitRating = async (ratingData) => {
  try {
    const response = await apiClient.post("/ratings", ratingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// upload image to Cloudinary
export const uploadImage = async (formData) => {
  try {
    const response = await apiClient.post("/reviews/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
