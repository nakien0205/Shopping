// Recommendations endpoint - simple collaborative filtering mock
const products = [
  {
    id: 1,
    title: "Black Left-Handed Keypad, Mechanical Keyboard Finance Design Budget Stock Office Wired USB",
    brand: "Lh$yu",
    price: 29.99,
    rating: 4.2,
    category: "Electronics",
    subcategory: "Keyboards",
    image: "https://via.placeholder.com/300x300?text=Left-Handed+Keyboard",
    tags: ["keyboard", "left-handed", "ergonomic", "office"]
  },
  {
    id: 2,
    title: "MKJ37815715 Replace Remote Control for LG Monitor TV",
    brand: "AIDITIYMI",
    price: 7.49,
    rating: 5.0,
    category: "Electronics",
    subcategory: "Remote Controls",
    image: "https://via.placeholder.com/300x300?text=LG+Remote+Control",
    tags: ["remote", "lg", "replacement", "tv"]
  },
  {
    id: 3,
    title: "Falcon Dust-Off Smart Pack Screen and Media Cloths",
    brand: "Falcon",
    price: 12.99,
    rating: 4.6,
    category: "Electronics",
    subcategory: "Cleaning Supplies",
    image: "https://via.placeholder.com/300x300?text=Cleaning+Cloths",
    tags: ["cleaning", "microfiber", "electronics", "screen"]
  },
  {
    id: 4,
    title: "FEELWORLD SC173-HSD 17.3 Inch Pullout Rackmount Monitor",
    brand: "FEELWORLD",
    price: 699.00,
    rating: 3.5,
    category: "Electronics",
    subcategory: "Monitors",
    image: "https://via.placeholder.com/300x300?text=Rackmount+Monitor",
    tags: ["monitor", "professional", "rackmount", "broadcast"]
  },
  {
    id: 5,
    title: "AC Power Cord Cable Compatible with ViewSonic LS830 Projector",
    brand: "YUSTDA",
    price: 8.06,
    rating: 4.0,
    category: "Electronics",
    subcategory: "Cables",
    image: "https://via.placeholder.com/300x300?text=Power+Cord",
    tags: ["power-cord", "viewsonic", "projector", "cable"]
  }
];

// Mock user interaction data
const userInteractions = {
  1: { views: [1, 2, 3], purchases: [1], ratings: { 1: 5, 2: 4 } },
  2: { views: [2, 4, 5], purchases: [2], ratings: { 2: 5, 4: 3 } },
  3: { views: [1, 3, 5], purchases: [3], ratings: { 3: 5, 1: 4 } },
  4: { views: [4, 5, 1], purchases: [4], ratings: { 4: 4, 5: 5 } },
  5: { views: [5, 2, 3], purchases: [5], ratings: { 5: 4, 2: 3 } }
};

function getRecommendations(userId, type = 'general', limit = 5) {
  switch (type) {
    case 'trending':
      // Return products sorted by rating and view count
      return products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
        .map(product => ({
          ...product,
          reason: 'Trending now',
          confidence: 0.8 + Math.random() * 0.2
        }));

    case 'similar':
      // For a specific user, find similar products based on their history
      const userHistory = userInteractions[userId] || { views: [], purchases: [] };
      const viewedCategories = userHistory.views.map(id => 
        products.find(p => p.id === id)?.category
      ).filter(Boolean);
      
      return products
        .filter(product => 
          viewedCategories.includes(product.category) && 
          !userHistory.views.includes(product.id)
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
        .map(product => ({
          ...product,
          reason: 'Similar to your viewed items',
          confidence: 0.7 + Math.random() * 0.3
        }));

    case 'personalized':
      // Personalized recommendations based on user preferences
      const userPrefs = userInteractions[userId] || { views: [], purchases: [], ratings: {} };
      const likedProducts = Object.entries(userPrefs.ratings)
        .filter(([id, rating]) => rating >= 4)
        .map(([id]) => parseInt(id));
      
      const likedTags = likedProducts
        .map(id => products.find(p => p.id === id)?.tags || [])
        .flat();
      
      return products
        .filter(product => 
          !userPrefs.views.includes(product.id) &&
          product.tags.some(tag => likedTags.includes(tag))
        )
        .sort((a, b) => {
          const aTagScore = a.tags.filter(tag => likedTags.includes(tag)).length;
          const bTagScore = b.tags.filter(tag => likedTags.includes(tag)).length;
          return bTagScore - aTagScore || b.rating - a.rating;
        })
        .slice(0, limit)
        .map(product => ({
          ...product,
          reason: 'Based on your preferences',
          confidence: 0.6 + Math.random() * 0.4
        }));

    case 'budget':
      // Budget-friendly recommendations
      return products
        .filter(product => product.price <= 50)
        .sort((a, b) => a.price - b.price)
        .slice(0, limit)
        .map(product => ({
          ...product,
          reason: 'Great value for money',
          confidence: 0.7
        }));

    case 'premium':
      // Premium recommendations
      return products
        .filter(product => product.price > 100)
        .sort((a, b) => b.price - a.price)
        .slice(0, limit)
        .map(product => ({
          ...product,
          reason: 'Premium quality',
          confidence: 0.8
        }));

    default:
      // General recommendations - mix of high-rated and popular items
      return products
        .sort((a, b) => (b.rating * 0.7 + Math.random() * 0.3) - (a.rating * 0.7 + Math.random() * 0.3))
        .slice(0, limit)
        .map(product => ({
          ...product,
          reason: 'Recommended for you',
          confidence: 0.5 + Math.random() * 0.5
        }));
  }
}

export default function handler(req, res) {
  const { method, query } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    userId = '1', 
    type = 'general', 
    limit = '5',
    category,
    priceRange 
  } = query;

  let recommendations = getRecommendations(userId, type, parseInt(limit));

  // Apply additional filters
  if (category) {
    recommendations = recommendations.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(parseFloat);
    recommendations = recommendations.filter(product => 
      product.price >= min && product.price <= max
    );
  }

  const response = {
    userId,
    type,
    recommendations,
    metadata: {
      algorithm: type === 'personalized' ? 'collaborative_filtering' : 'content_based',
      generated_at: new Date().toISOString(),
      total_products_analyzed: products.length,
      average_confidence: recommendations.length > 0 
        ? recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length 
        : 0
    }
  };

  res.status(200).json(response);
}
