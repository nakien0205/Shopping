// Search endpoint with advanced filtering
const products = [
  {
    id: 1,
    title: "Black Left-Handed Keypad, Mechanical Keyboard Finance Design Budget Stock Office Wired USB",
    brand: "Lh$yu",
    description: "Left-handed keyboard designed for users to reduce stretched right-hand drive, balance load between left and right sides of upper body.",
    price: 29.99,
    originalPrice: 34.99,
    currency: "USD",
    availability: "in_stock",
    rating: 4.2,
    reviewsCount: 15,
    category: "Electronics",
    subcategory: "Keyboards",
    image: "https://via.placeholder.com/300x300?text=Left-Handed+Keyboard",
    tags: ["keyboard", "left-handed", "ergonomic", "office", "mechanical", "wired", "usb"]
  },
  {
    id: 2,
    title: "MKJ37815715 Replace Remote Control for LG Monitor TV",
    brand: "AIDITIYMI",
    description: "High-grade remote control, perfect to replace your broken or old one. Compatible with LG Monitor TV models.",
    price: 7.49,
    originalPrice: 7.49,
    currency: "USD",
    availability: "in_stock",
    rating: 5.0,
    reviewsCount: 1,
    category: "Electronics",
    subcategory: "Remote Controls",
    image: "https://via.placeholder.com/300x300?text=LG+Remote+Control",
    tags: ["remote", "lg", "replacement", "tv", "monitor", "control"]
  },
  {
    id: 3,
    title: "Falcon Dust-Off Smart Pack Screen and Media Cloths",
    brand: "Falcon",
    description: "Advanced microfiber cleaning cloth technology for safe removal of dust, dirt, and smudges from sensitive electronic equipment.",
    price: 12.99,
    originalPrice: 15.99,
    currency: "USD",
    availability: "out_of_stock",
    rating: 4.6,
    reviewsCount: 3,
    category: "Electronics",
    subcategory: "Cleaning Supplies",
    image: "https://via.placeholder.com/300x300?text=Cleaning+Cloths",
    tags: ["cleaning", "microfiber", "electronics", "screen", "dust", "cloth"]
  },
  {
    id: 4,
    title: "FEELWORLD SC173-HSD 17.3 Inch Pullout Rackmount Monitor",
    brand: "FEELWORLD",
    description: "17.3\" IPS display panel with 1920x1080 resolution, perfect for broadcast or live event production with 1RU rack drawer design.",
    price: 699.00,
    originalPrice: 799.00,
    currency: "USD",
    availability: "limited_stock",
    rating: 3.5,
    reviewsCount: 6,
    category: "Electronics",
    subcategory: "Monitors",
    image: "https://via.placeholder.com/300x300?text=Rackmount+Monitor",
    tags: ["monitor", "professional", "rackmount", "broadcast", "ips", "1080p"]
  },
  {
    id: 5,
    title: "AC Power Cord Cable Compatible with ViewSonic LS830 Projector",
    brand: "YUSTDA",
    description: "100% Brand New, High Quality AC Power Cord with 3 prongs USA standard design, 6 feet cable length.",
    price: 8.06,
    originalPrice: 8.06,
    currency: "USD",
    availability: "in_stock",
    rating: 4.0,
    reviewsCount: 12,
    category: "Electronics",
    subcategory: "Cables",
    image: "https://via.placeholder.com/300x300?text=Power+Cord",
    tags: ["power-cord", "viewsonic", "projector", "cable", "ac", "cord"]
  }
];

function calculateRelevanceScore(product, searchTerms) {
  let score = 0;
  const allTerms = searchTerms.join(' ').toLowerCase();
  
  // Title match (highest weight)
  if (product.title.toLowerCase().includes(allTerms)) {
    score += 10;
  }
  
  // Individual term matches in title
  searchTerms.forEach(term => {
    if (product.title.toLowerCase().includes(term.toLowerCase())) {
      score += 5;
    }
  });
  
  // Brand match
  searchTerms.forEach(term => {
    if (product.brand.toLowerCase().includes(term.toLowerCase())) {
      score += 3;
    }
  });
  
  // Description match
  searchTerms.forEach(term => {
    if (product.description.toLowerCase().includes(term.toLowerCase())) {
      score += 2;
    }
  });
  
  // Tag matches
  searchTerms.forEach(term => {
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(term.toLowerCase())) {
        score += 1;
      }
    });
  });
  
  return score;
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

  const { q, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = query;

  if (!q || q.trim() === '') {
    return res.status(400).json({ 
      error: 'Search query is required',
      message: 'Please provide a search query parameter (q)' 
    });
  }

  const searchTerms = q.trim().split(/\s+/);
  let results = [];

  // Find matching products
  products.forEach(product => {
    const score = calculateRelevanceScore(product, searchTerms);
    if (score > 0) {
      results.push({
        ...product,
        relevanceScore: score
      });
    }
  });

  // Sort by relevance score (highest first)
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Apply additional filters
  if (category) {
    results = results.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    results = results.filter(product => 
      product.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    results = results.filter(product => 
      product.price <= parseFloat(maxPrice)
    );
  }

  // Apply sorting (override relevance if specified)
  if (sort) {
    switch (sort) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'name_asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedResults = results.slice(startIndex, endIndex);

  // Remove relevance scores from final results
  const cleanResults = paginatedResults.map(({ relevanceScore, ...product }) => product);

  // Generate search suggestions
  const suggestions = [];
  const allTags = [...new Set(products.flatMap(p => p.tags))];
  searchTerms.forEach(term => {
    const relatedTags = allTags.filter(tag => 
      tag.toLowerCase().includes(term.toLowerCase()) && tag.toLowerCase() !== term.toLowerCase()
    ).slice(0, 3);
    suggestions.push(...relatedTags);
  });

  const response = {
    query: q,
    results: cleanResults,
    totalResults: results.length,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(results.length / limitNum),
      hasNext: endIndex < results.length,
      hasPrev: startIndex > 0
    },
    suggestions: [...new Set(suggestions)].slice(0, 5),
    filters: {
      categories: [...new Set(results.map(p => p.category))],
      brands: [...new Set(results.map(p => p.brand))],
      priceRange: results.length > 0 ? {
        min: Math.min(...results.map(p => p.price)),
        max: Math.max(...results.map(p => p.price))
      } : null
    },
    searchTime: Date.now() % 1000 + 'ms' // Mock search time
  };

  res.status(200).json(response);
}
