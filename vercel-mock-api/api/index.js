// Health check and API info endpoint
export default function handler(req, res) {
  const { method } = req;

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

  const response = {
    name: "Shopping Mock API",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: {
      products: {
        url: "/api/products",
        description: "Get all products with filtering, searching, and pagination",
        methods: ["GET"],
        parameters: {
          category: "Filter by category",
          subcategory: "Filter by subcategory",
          search: "Search in title, description, brand, and tags",
          minPrice: "Minimum price filter",
          maxPrice: "Maximum price filter",
          availability: "Filter by availability (in_stock, out_of_stock, limited_stock)",
          sort: "Sort by (price_asc, price_desc, rating_desc, name_asc, popularity)",
          page: "Page number for pagination (default: 1)",
          limit: "Items per page (default: 10)"
        }
      },
      product_details: {
        url: "/api/product/[id]",
        description: "Get detailed information about a specific product",
        methods: ["GET"],
        parameters: {
          id: "Product ID (required)"
        }
      },
      categories: {
        url: "/api/categories",
        description: "Get all categories and subcategories",
        methods: ["GET"],
        parameters: {
          hasProducts: "Filter categories that have products (true/false)",
          includeSubcategories: "Include subcategories in response (default: true)"
        }
      },
      search: {
        url: "/api/search",
        description: "Advanced search with relevance scoring",
        methods: ["GET"],
        parameters: {
          q: "Search query (required)",
          category: "Filter by category",
          minPrice: "Minimum price filter",
          maxPrice: "Maximum price filter",
          sort: "Sort by (price_asc, price_desc, rating_desc, name_asc)",
          page: "Page number for pagination (default: 1)",
          limit: "Items per page (default: 10)"
        }
      },
      recommendations: {
        url: "/api/recommendations",
        description: "Get product recommendations for users",
        methods: ["GET"],
        parameters: {
          userId: "User ID (default: 1)",
          type: "Recommendation type (general, trending, similar, personalized, budget, premium)",
          limit: "Number of recommendations (default: 5)",
          category: "Filter by category",
          priceRange: "Price range filter (format: min-max)"
        }
      }
    },
    features: [
      "Product catalog with detailed information",
      "Advanced search with relevance scoring",
      "Category and subcategory organization",
      "Product recommendations engine",
      "Pagination support",
      "Multiple filtering options",
      "CORS enabled for web applications",
      "RESTful API design"
    ],
    sample_requests: {
      get_all_products: "/api/products?page=1&limit=5",
      search_keyboards: "/api/search?q=keyboard&category=Electronics",
      get_product_details: "/api/product/1",
      get_categories: "/api/categories?hasProducts=true",
      get_recommendations: "/api/recommendations?userId=1&type=personalized&limit=3"
    },
    data_info: {
      total_products: 5,
      categories: ["Electronics"],
      price_range: {
        min: 7.49,
        max: 699.00
      },
      last_updated: "2025-08-10"
    }
  };

  res.status(200).json(response);
}
