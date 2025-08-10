// Get product by ID
const products = [
  {
    id: 1,
    title: "Black Left-Handed Keypad, Mechanical Keyboard Finance Design Budget Stock Office Wired USB",
    brand: "Lh$yu",
    description: "Left-handed keyboard designed for users to reduce stretched right-hand drive, balance load between left and right sides of upper body.",
    detailedDescription: "Left-handed keyboard: Designed for left-handed users, by reducing the stretched right-hand drive, the user can use the right-handed mouse to balance the load between the left and right sides of the upper body, thus greatly reducing the pressure on the shoulder muscles of the mouse. Solve computer problems with USB interface, USB interface is too small to stop. The left and right mouse are balanced and efficient ways of working.",
    price: 29.99,
    originalPrice: 34.99,
    currency: "USD",
    availability: "in_stock",
    stock: 25,
    rating: 4.2,
    reviewsCount: 15,
    category: "Electronics",
    subcategory: "Keyboards",
    manufacturer: "Lh$yu",
    dimensions: "18.31\"L x 5.43\"W x 1.06\"H",
    weight: "1.2 pounds",
    color: "Black",
    images: [
      "https://via.placeholder.com/400x400?text=Left-Handed+Keyboard+1",
      "https://via.placeholder.com/400x400?text=Left-Handed+Keyboard+2",
      "https://via.placeholder.com/400x400?text=Left-Handed+Keyboard+3"
    ],
    features: [
      "DUAL USB INTERFACE to solve the problem of your computer, the USB interface is too small and impractical to use",
      "DIMENSIONS Length 465mmX Width 138mmX Height 27mm, ergonomic design, whether it is work or design, can be well applied",
      "LEFT HANDED KEYBOARD DESIGN Avoid frequent switching between keyboard and mouse with the right hand when entering numbers on the right keyboard version",
      "APPLICABLE PERSONS CAD, BIM architecture drawings and other designers and finances, engineering budget, commonly used left-handers",
      "IMPROVE WORK EFFICIENCY left keyboard, right mouse, open working mode, increase work efficiency by more than 20%"
    ],
    specifications: {
      "Type": "Wired USB Keyboard",
      "Layout": "Left-handed Numeric Keypad",
      "Compatibility": "Windows, Mac, Linux",
      "Cable Length": "1.5 meters",
      "Key Type": "Mechanical",
      "Color": "Black"
    },
    tags: ["keyboard", "left-handed", "ergonomic", "office", "mechanical"],
    shipping: {
      "weight": "1.2 pounds",
      "dimensions": "18.31\"L x 5.43\"W x 1.06\"H",
      "estimatedDelivery": "3-5 business days"
    },
    warranty: "1 year manufacturer warranty",
    returnPolicy: "30-day return policy"
  },
  {
    id: 2,
    title: "MKJ37815715 Replace Remote Control for LG Monitor TV",
    brand: "AIDITIYMI",
    description: "High-grade remote control, perfect to replace your broken or old one. Compatible with LG Monitor TV models.",
    detailedDescription: "High-grade remote control, Perfect to replace your broken or old one. A perfect product for you. Don't miss it. Brand new! No programming or pairing needed, just install new alkaline batteries, then it's ready for use. The lightweight and ergonomic design make it very comfortable.",
    price: 7.49,
    originalPrice: 7.49,
    currency: "USD",
    availability: "in_stock",
    stock: 10,
    rating: 5.0,
    reviewsCount: 1,
    category: "Electronics",
    subcategory: "Remote Controls",
    manufacturer: "AIDITIYMI",
    dimensions: "7.28 x 2.05 x 0.91 inches",
    weight: "2.25 ounces",
    color: "Black",
    images: [
      "https://via.placeholder.com/400x400?text=LG+Remote+Control+1",
      "https://via.placeholder.com/400x400?text=LG+Remote+Control+2"
    ],
    features: [
      "High-grade remote control, Perfect to replace your broken or old one",
      "Brand new! No programming or pairing needed, just install new alkaline batteries",
      "The lightweight and ergonomic design make it very comfortable",
      "Compatible with these models MKJ37815715 M197WAP-PT M197WAP M227WAP M237WAP"
    ],
    specifications: {
      "Model": "MKJ37815715",
      "Brand Compatibility": "LG",
      "Battery Type": "2 x AAA (not included)",
      "Range": "Up to 30 feet",
      "Programming Required": "No"
    },
    compatibleModels: ["M197WAP-PT", "M197WAP", "M227WAP", "M237WAP"],
    tags: ["remote", "lg", "replacement", "tv", "monitor"],
    shipping: {
      "weight": "2.25 ounces",
      "dimensions": "7.28 x 2.05 x 0.91 inches",
      "estimatedDelivery": "2-3 business days"
    },
    warranty: "90 days manufacturer warranty",
    returnPolicy: "30-day return policy"
  }
];

export default function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

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

  if (!id) {
    return res.status(400).json({ 
      error: 'Product ID is required',
      message: 'Please provide a product ID in the URL path' 
    });
  }

  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ 
      error: 'Product not found',
      message: `No product found with ID: ${id}` 
    });
  }

  // Add related products (simple logic - same category, different ID)
  const relatedProducts = products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      title: p.title,
      brand: p.brand,
      price: p.price,
      rating: p.rating,
      images: [p.images[0]]
    }));

  const response = {
    product,
    relatedProducts,
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: product.category, url: `/category/${product.category.toLowerCase()}` },
      { name: product.subcategory, url: `/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}` },
      { name: product.title, url: `/product/${product.id}` }
    ]
  };

  res.status(200).json(response);
}
