// Mock product data based on your Amazon products
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
    features: [
      "DUAL USB INTERFACE to solve computer USB interface problems",
      "DIMENSIONS Length 465mmX Width 138mmX Height 27mm, ergonomic design",
      "LEFT HANDED KEYBOARD DESIGN to reduce shoulder fatigue",
      "IMPROVE WORK EFFICIENCY by more than 20%"
    ],
    tags: ["keyboard", "left-handed", "ergonomic", "office"]
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
    features: [
      "High-grade remote control replacement",
      "No programming or pairing needed",
      "Lightweight and ergonomic design",
      "Compatible with multiple LG models"
    ],
    tags: ["remote", "lg", "replacement", "tv"]
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
    features: [
      "Advanced microfiber cleaning cloth technology",
      "4 great cleaning cloths in convenient storage tin",
      "Safe for LCD and Plasma screens",
      "Multi-use microfiber pad included"
    ],
    tags: ["cleaning", "microfiber", "electronics", "screen"]
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
    features: [
      "Full HD 1920x1080 Resolution",
      "1RU pull-out rackmount Design",
      "Multiple input options (HDMI, DVI, VGA, etc.)",
      "Advanced monitoring tools included"
    ],
    tags: ["monitor", "professional", "rackmount", "broadcast"]
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
    features: [
      "100% Brand New, High Quality AC Power Cord",
      "3 prongs USA standard power cable design",
      "Cable Length: 6 feet",
      "Multiple safety protection features"
    ],
    tags: ["power-cord", "viewsonic", "projector", "cable"]
  }
];

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

  let filteredProducts = [...products];

  // Filter by category
  if (query.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === query.category.toLowerCase()
    );
  }

  // Filter by subcategory
  if (query.subcategory) {
    filteredProducts = filteredProducts.filter(product => 
      product.subcategory.toLowerCase() === query.subcategory.toLowerCase()
    );
  }

  // Filter by availability
  if (query.availability) {
    filteredProducts = filteredProducts.filter(product => 
      product.availability === query.availability
    );
  }

  // Filter by price range
  if (query.minPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= parseFloat(query.minPrice)
    );
  }

  if (query.maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= parseFloat(query.maxPrice)
    );
  }

  // Search functionality
  if (query.search) {
    const searchTerm = query.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Sort functionality
  if (query.sort) {
    switch (query.sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name_asc':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        break;
    }
  }

  // Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const response = {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      totalProducts: filteredProducts.length,
      hasNext: endIndex < filteredProducts.length,
      hasPrev: startIndex > 0
    },
    filters: {
      categories: [...new Set(products.map(p => p.category))],
      subcategories: [...new Set(products.map(p => p.subcategory))],
      brands: [...new Set(products.map(p => p.brand))],
      priceRange: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price))
      }
    }
  };

  res.status(200).json(response);
}
