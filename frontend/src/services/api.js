import axios from "axios";

// Make sure the API URL includes /api
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://fitpage-bov7.onrender.com/api";

// Add debugging
console.log("Using API URL:", API_BASE_URL);

// Create an axios instance with proper error handling
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// fetch all products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// fetch reviews for a product
export const fetchReviews = async (productId) => {
  try {
    const response = await apiClient.get(`/reviews/${productId}`);
    const reviews = response.data;

    // Get user data for each review
    const usersResponse = await apiClient.get("/users");
    const users = usersResponse.data;

    // Enrich reviews with user data
    return reviews.map((review) => {
      const user = users.find((u) => u.id === review.user_id);
      return {
        ...review,
        user,
      };
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error;
  }
};

// fetch ratings for a product
export const fetchRatings = async (productId) => {
  const response = await apiClient.get(`/ratings/${productId}`);
  const ratings = response.data;

  // Get user data for each rating
  const userIds = [...new Set(ratings.map((rating) => rating.user_id))];
  const usersResponse = await apiClient.get(`/users`);
  const users = usersResponse.data;

  // Enrich ratings with user data
  return ratings.map((rating) => {
    const user = users.find((u) => u.id === rating.user_id);
    return {
      ...rating,
      user,
    };
  });
};

// Fetch average rating for a product
export const fetchAverageRating = async (productId) => {
  const response = await apiClient.get(`/ratings/${productId}/average`);
  return response.data;
};

// add a review
export const addReview = async (productId, reviewData) => {
  const { userId, reviewText, imageUrl } = reviewData;
  const response = await apiClient.post(`/reviews/${productId}`, {
    userId,
    reviewText,
    imageUrl,
  });
  return response.data;
};

// add a rating
export const addRating = async (productId, ratingData) => {
  const response = await apiClient.post(`/ratings/${productId}`, ratingData);
  return response.data;
};

// fetch tags for a product
export const fetchTags = async (productId) => {
  const response = await apiClient.get(`/reviews/${productId}/tags`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await apiClient.get(`/users`);
  return response.data;
};
