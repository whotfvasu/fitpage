import axios from "axios";

// Check environment and use appropriate API URL
// In production, use the Render URL
// In development, use the localhost URL with port 3000
const isDevelopment = import.meta.env.DEV;
const prodUrl = "https://fitpage-bov7.onrender.com/api";
const devUrl = "http://localhost:3000/api";

// Select the appropriate base URL based on environment
// You can still override with VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? devUrl : prodUrl);

// Log the API URL being used
console.log(`Environment: ${isDevelopment ? 'Development' : 'Production'}`);
console.log("Using API URL:", API_BASE_URL);

// Create an axios instance with proper error handling
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
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

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response error:", error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Utility function to retry failed requests
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 1) throw error;
    console.log(`Retrying request... Attempts left: ${retries-1}`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
};

// fetch all products
export const fetchProducts = async () => {
  try {
    return await retryRequest(async () => {
      const response = await apiClient.get("/products");
      return response.data;
    });
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
