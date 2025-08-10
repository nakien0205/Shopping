// Categories endpoint
const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Latest electronic devices and accessories",
    image: "https://via.placeholder.com/300x200?text=Electronics",
    productCount: 5,
    subcategories: [
      {
        id: 11,
        name: "Keyboards",
        slug: "keyboards",
        description: "Mechanical and ergonomic keyboards",
        productCount: 1
      },
      {
        id: 12,
        name: "Remote Controls",
        slug: "remote-controls",
        description: "Universal and replacement remote controls",
        productCount: 1
      },
      {
        id: 13,
        name: "Cleaning Supplies",
        slug: "cleaning-supplies",
        description: "Electronic device cleaning supplies",
        productCount: 1
      },
      {
        id: 14,
        name: "Monitors",
        slug: "monitors",
        description: "Professional and consumer monitors",
        productCount: 1
      },
      {
        id: 15,
        name: "Cables",
        slug: "cables",
        description: "Power and data cables",
        productCount: 1
      }
    ]
  },
  {
    id: 2,
    name: "Home & Garden",
    slug: "home-garden",
    description: "Home improvement and garden supplies",
    image: "https://via.placeholder.com/300x200?text=Home+Garden",
    productCount: 0,
    subcategories: []
  },
  {
    id: 3,
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Sports equipment and outdoor gear",
    image: "https://via.placeholder.com/300x200?text=Sports+Outdoors",
    productCount: 0,
    subcategories: []
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

  // Filter categories that have products if requested
  let filteredCategories = categories;
  
  if (query.hasProducts === 'true') {
    filteredCategories = categories.filter(cat => cat.productCount > 0);
  }

  // Include subcategories or not
  if (query.includeSubcategories === 'false') {
    filteredCategories = filteredCategories.map(cat => {
      const { subcategories, ...categoryWithoutSubs } = cat;
      return categoryWithoutSubs;
    });
  }

  res.status(200).json({
    categories: filteredCategories,
    total: filteredCategories.length
  });
}
