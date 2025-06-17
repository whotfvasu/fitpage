// Mock data for when the database is unavailable
export const mockUsers = [
  { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com" },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Alex Brown",
    username: "alexbrown",
    email: "alex@example.com",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    username: "sarahwilson",
    email: "sarah@example.com",
  },
  {
    id: 5,
    name: "Michael Johnson",
    username: "michaelj",
    email: "michael@example.com",
  },
];

export const mockProducts = [
  {
    id: 1,
    name: "Ultra Boost Running Shoes",
    description:
      "High-performance running shoes with responsive cushioning for maximum comfort.",
    price: 129.99,
    image_url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Performance Running Socks",
    description:
      "Breathable, moisture-wicking socks designed for long-distance running.",
    price: 15.99,
    image_url:
      "https://images.unsplash.com/photo-1586350977771-b3725b1b381c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Lightweight Running Jacket",
    description:
      "Windproof and water-resistant jacket perfect for running in all weather conditions.",
    price: 79.99,
    image_url:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Hydration Belt",
    description:
      "Comfortable belt with water bottle holders and pocket for essentials.",
    price: 34.99,
    image_url:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "GPS Running Watch",
    description:
      "Advanced GPS watch with heart rate monitoring and performance metrics.",
    price: 199.99,
    image_url:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop",
  },
];

export const mockRatings = [
  {
    id: 1,
    product_id: 1,
    user_id: 2,
    rating: 4,
    created_at: "2025-05-15T10:30:00Z",
  },
  {
    id: 2,
    product_id: 1,
    user_id: 3,
    rating: 5,
    created_at: "2025-05-16T14:20:00Z",
  },
  {
    id: 3,
    product_id: 2,
    user_id: 1,
    rating: 3,
    created_at: "2025-05-17T09:45:00Z",
  },
  {
    id: 4,
    product_id: 3,
    user_id: 4,
    rating: 5,
    created_at: "2025-05-18T16:10:00Z",
  },
  {
    id: 5,
    product_id: 4,
    user_id: 5,
    rating: 4,
    created_at: "2025-05-19T11:30:00Z",
  },
];

export const mockReviews = [
  {
    id: 1,
    product_id: 1,
    user_id: 2,
    review_text:
      "These shoes are incredibly comfortable and provide great support on long runs. Highly recommend!",
    image_url:
      "https://images.unsplash.com/photo-1578116922645-3976907a7671?q=80&w=400",
    created_at: "2025-05-15T11:00:00Z",
  },
  {
    id: 2,
    product_id: 1,
    user_id: 3,
    review_text:
      "Perfect fit and amazing cushioning. My feet don't hurt anymore after my 10K runs.",
    image_url: null,
    created_at: "2025-05-16T15:00:00Z",
  },
  {
    id: 3,
    product_id: 2,
    user_id: 1,
    review_text:
      "Good quality socks, but I was expecting them to be a bit more cushioned.",
    image_url: null,
    created_at: "2025-05-17T10:15:00Z",
  },
  {
    id: 4,
    product_id: 3,
    user_id: 4,
    review_text:
      "This jacket is perfect for my morning runs. Lightweight and keeps me dry in light rain.",
    image_url:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=400",
    created_at: "2025-05-18T16:30:00Z",
  },
  {
    id: 5,
    product_id: 4,
    user_id: 5,
    review_text:
      "Great hydration belt that doesn't bounce during runs. Bottles are easy to access while moving.",
    image_url: null,
    created_at: "2025-05-19T12:00:00Z",
  },
];
