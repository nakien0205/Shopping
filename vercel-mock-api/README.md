# Shopping Mock API for Vercel

A comprehensive mock API for e-commerce applications, built specifically for deployment on Vercel. This API provides realistic product data and endpoints that you can use for testing, prototyping, or development of shopping applications.

## 🚀 Quick Start

### Deploy to Vercel

1. **One-click deploy**: 
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

2. **Manual deployment**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

3. **Local development**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Run locally
   vercel dev
   ```

## 📚 API Documentation

### Base URL
- **Production**: `https://your-app.vercel.app/api`
- **Local**: `http://localhost:3000/api`

### Endpoints

#### 🏠 Health Check
```http
GET /api/
```
Returns API information, available endpoints, and health status.

#### 📦 Products
```http
GET /api/products
```
Get all products with filtering, searching, and pagination.

**Query Parameters:**
- `category` - Filter by category
- `subcategory` - Filter by subcategory  
- `search` - Search in title, description, brand, and tags
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `availability` - Filter by availability (`in_stock`, `out_of_stock`, `limited_stock`)
- `sort` - Sort by (`price_asc`, `price_desc`, `rating_desc`, `name_asc`, `popularity`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```http
GET /api/products?category=Electronics&sort=price_asc&page=1&limit=5
```

#### 🔍 Product Details
```http
GET /api/product/[id]
```
Get detailed information about a specific product including related products.

**Example:**
```http
GET /api/product/1
```

#### 🏷️ Categories
```http
GET /api/categories
```
Get all categories and subcategories.

**Query Parameters:**
- `hasProducts` - Filter categories that have products (`true`/`false`)
- `includeSubcategories` - Include subcategories in response (default: `true`)

**Example:**
```http
GET /api/categories?hasProducts=true
```

#### 🔎 Search
```http
GET /api/search
```
Advanced search with relevance scoring and suggestions.

**Query Parameters:**
- `q` - Search query (required)
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort by (`price_asc`, `price_desc`, `rating_desc`, `name_asc`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```http
GET /api/search?q=keyboard&category=Electronics
```

#### 🎯 Recommendations
```http
GET /api/recommendations
```
Get product recommendations based on different algorithms.

**Query Parameters:**
- `userId` - User ID (default: 1)
- `type` - Recommendation type:
  - `general` - General recommendations
  - `trending` - Trending products
  - `similar` - Similar to user's viewed items
  - `personalized` - Based on user preferences
  - `budget` - Budget-friendly options
  - `premium` - Premium products
- `limit` - Number of recommendations (default: 5)
- `category` - Filter by category
- `priceRange` - Price range filter (format: `min-max`)

**Example:**
```http
GET /api/recommendations?userId=1&type=personalized&limit=3
```

## 📊 Sample Data

The API includes sample data for:
- **5 Products** across Electronics category
- **Multiple subcategories**: Keyboards, Remote Controls, Cleaning Supplies, Monitors, Cables
- **Realistic pricing**: $7.49 - $699.00
- **Product features**: Ratings, reviews, detailed descriptions, specifications
- **User interaction data**: For recommendations engine

## 🛠️ Response Format

### Success Response
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalProducts": 5,
    "hasNext": false,
    "hasPrev": false
  },
  "filters": {
    "categories": ["Electronics"],
    "subcategories": ["Keyboards", "Remote Controls"],
    "brands": ["Lh$yu", "AIDITIYMI"],
    "priceRange": {
      "min": 7.49,
      "max": 699.00
    }
  }
}
```

### Error Response
```json
{
  "error": "Product not found",
  "message": "No product found with ID: 999"
}
```

## 🌐 CORS Support

All endpoints include CORS headers for web application compatibility:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## 🔧 Features

- ✅ RESTful API design
- ✅ Realistic e-commerce data
- ✅ Advanced search with relevance scoring
- ✅ Product recommendation engine
- ✅ Pagination support
- ✅ Multiple filtering options
- ✅ Category organization
- ✅ CORS enabled
- ✅ Error handling
- ✅ Comprehensive documentation

## 💡 Use Cases

- **Frontend Development**: Test your shopping app frontend
- **API Integration**: Practice API consumption
- **Prototyping**: Quick mock data for demos
- **Learning**: Understand e-commerce API structures
- **Testing**: Automated testing with realistic data

## 🤝 Contributing

Feel free to extend the API with more:
- Product categories
- Advanced filtering options
- User authentication endpoints
- Shopping cart functionality
- Order management
- Payment processing mocks

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Ready to shop? 🛒 Start exploring the API endpoints!**
