export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

export const products: Product[] = [
  // Electronics
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    image: "/placeholder-lzht5.png",
    category: "electronics",
    rating: 4.5,
    stock: 25,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration.",
    price: 299.99,
    image: "/smart-fitness-watch.png",
    category: "electronics",
    rating: 4.3,
    stock: 15,
  },
  {
    id: "11",
    name: "Wireless Gaming Mouse",
    description:
      "High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.",
    price: 89.99,
    image: "/wireless-gaming-mouse.png",
    category: "electronics",
    rating: 4.4,
    stock: 16,
  },
  {
    id: "13",
    name: "4K Webcam",
    description:
      "Ultra HD webcam with auto-focus and built-in microphone for professional video calls.",
    price: 129.99,
    image: "/4k-webcam.png",
    category: "electronics",
    rating: 4.6,
    stock: 20,
  },
  {
    id: "14",
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound and 12-hour battery life.",
    price: 79.99,
    image: "/bluetooth-speaker.png",
    category: "electronics",
    rating: 4.2,
    stock: 30,
  },
  {
    id: "15",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "/wireless-charging-pad.png",
    category: "electronics",
    rating: 4.1,
    stock: 45,
  },
  {
    id: "16",
    name: "USB-C Hub",
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.",
    price: 59.99,
    image: "/usb-c-hub.png",
    category: "electronics",
    rating: 4.3,
    stock: 25,
  },

  // Clothing
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    description:
      "Comfortable 100% organic cotton t-shirt available in multiple colors and sizes.",
    price: 29.99,
    image: "/premium-cotton-tshirt.png",
    category: "clothing",
    rating: 4.7,
    stock: 50,
  },
  {
    id: "4",
    name: "Classic Denim Jeans",
    description:
      "Timeless straight-fit denim jeans made from premium denim fabric.",
    price: 79.99,
    image: "/placeholder-aqvrd.png",
    category: "clothing",
    rating: 4.4,
    stock: 30,
  },
  {
    id: "12",
    name: "Leather Wallet",
    description:
      "Genuine leather wallet with RFID blocking technology and multiple card slots.",
    price: 45.99,
    image: "/leather-wallet.png",
    category: "clothing",
    rating: 4.3,
    stock: 28,
  },
  {
    id: "17",
    name: "Winter Jacket",
    description:
      "Warm and stylish winter jacket with water-resistant coating and insulated lining.",
    price: 149.99,
    image: "/winter-jacket.png",
    category: "clothing",
    rating: 4.5,
    stock: 18,
  },
  {
    id: "18",
    name: "Running Shoes",
    description:
      "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
    price: 119.99,
    image: "/running-shoes.png",
    category: "clothing",
    rating: 4.6,
    stock: 35,
  },
  {
    id: "19",
    name: "Casual Hoodie",
    description:
      "Comfortable cotton blend hoodie perfect for casual wear and lounging.",
    price: 54.99,
    image: "/casual-hoodie.png",
    category: "clothing",
    rating: 4.4,
    stock: 40,
  },
  {
    id: "20",
    name: "Business Shirt",
    description:
      "Professional dress shirt made from wrinkle-resistant fabric, perfect for office wear.",
    price: 69.99,
    image: "/business-shirt.png",
    category: "clothing",
    rating: 4.2,
    stock: 22,
  },

  // Books
  {
    id: "5",
    name: "JavaScript: The Complete Guide",
    description:
      "Comprehensive guide to modern JavaScript programming with practical examples.",
    price: 49.99,
    image: "/javascript-programming-book.png",
    category: "books",
    rating: 4.8,
    stock: 20,
  },
  {
    id: "6",
    name: "React Development Handbook",
    description:
      "Master React development with this comprehensive handbook covering hooks, context, and more.",
    price: 59.99,
    image: "/react-development-handbook.png",
    category: "books",
    rating: 4.6,
    stock: 18,
  },
  {
    id: "21",
    name: "Python for Data Science",
    description:
      "Learn data science with Python including pandas, numpy, and machine learning libraries.",
    price: 54.99,
    image: "/python-data-science.png",
    category: "books",
    rating: 4.7,
    stock: 15,
  },
  {
    id: "22",
    name: "Web Design Fundamentals",
    description:
      "Complete guide to modern web design principles, UX/UI, and responsive design.",
    price: 44.99,
    image: "/web-design-book.png",
    category: "books",
    rating: 4.5,
    stock: 25,
  },
  {
    id: "23",
    name: "Digital Marketing Strategy",
    description:
      "Comprehensive guide to digital marketing including SEO, social media, and analytics.",
    price: 39.99,
    image: "/digital-marketing-book.png",
    category: "books",
    rating: 4.3,
    stock: 30,
  },
  {
    id: "24",
    name: "Photography Masterclass",
    description:
      "Learn professional photography techniques from composition to post-processing.",
    price: 64.99,
    image: "/photography-book.png",
    category: "books",
    rating: 4.8,
    stock: 12,
  },

  // Home & Garden
  {
    id: "7",
    name: "Indoor Plant Collection",
    description:
      "Beautiful set of 3 low-maintenance indoor plants perfect for home decoration.",
    price: 89.99,
    image: "/indoor-plant-collection.png",
    category: "home",
    rating: 4.5,
    stock: 12,
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    description:
      "Elegant set of 4 ceramic coffee mugs with modern design and comfortable handles.",
    price: 39.99,
    image: "/ceramic-coffee-mug-set.png",
    category: "home",
    rating: 4.2,
    stock: 35,
  },
  {
    id: "25",
    name: "Smart LED Light Bulbs",
    description:
      "WiFi-enabled smart bulbs with color changing and dimming capabilities.",
    price: 79.99,
    image: "/smart-led-bulbs.png",
    category: "home",
    rating: 4.4,
    stock: 28,
  },
  {
    id: "26",
    name: "Kitchen Knife Set",
    description:
      "Professional 8-piece kitchen knife set with wooden block and sharpening steel.",
    price: 129.99,
    image: "/kitchen-knife-set.png",
    category: "home",
    rating: 4.7,
    stock: 15,
  },
  {
    id: "27",
    name: "Throw Pillow Set",
    description:
      "Set of 4 decorative throw pillows with removable covers in various patterns.",
    price: 49.99,
    image: "/throw-pillow-set.png",
    category: "home",
    rating: 4.3,
    stock: 32,
  },
  {
    id: "28",
    name: "Garden Tool Set",
    description:
      "Complete 10-piece garden tool set with ergonomic handles and storage bag.",
    price: 94.99,
    image: "/garden-tool-set.png",
    category: "home",
    rating: 4.5,
    stock: 20,
  },
  {
    id: "29",
    name: "Air Purifier",
    description:
      "HEPA air purifier with smart sensors and app control for rooms up to 500 sq ft.",
    price: 199.99,
    image: "/air-purifier.png",
    category: "home",
    rating: 4.6,
    stock: 14,
  },

  // Sports
  {
    id: "9",
    name: "Professional Tennis Racket",
    description:
      "High-performance tennis racket used by professionals, lightweight with excellent control.",
    price: 159.99,
    image: "/placeholder-6k3c1.png",
    category: "sports",
    rating: 4.7,
    stock: 8,
  },
  {
    id: "10",
    name: "Yoga Mat Premium",
    description:
      "Non-slip premium yoga mat with extra cushioning and eco-friendly materials.",
    price: 69.99,
    image: "/premium-yoga-mat.png",
    category: "sports",
    rating: 4.6,
    stock: 22,
  },
  {
    id: "30",
    name: "Adjustable Dumbbells",
    description:
      "Space-saving adjustable dumbbells with weight range from 5-50 lbs per dumbbell.",
    price: 299.99,
    image: "/adjustable-dumbbells.png",
    category: "sports",
    rating: 4.8,
    stock: 10,
  },
  {
    id: "31",
    name: "Basketball",
    description:
      "Official size basketball with superior grip and durability for indoor/outdoor play.",
    price: 34.99,
    image: "/basketball.png",
    category: "sports",
    rating: 4.4,
    stock: 25,
  },
  {
    id: "32",
    name: "Resistance Band Set",
    description:
      "Complete resistance band set with 5 bands, handles, door anchor, and workout guide.",
    price: 29.99,
    image: "/resistance-band-set.png",
    category: "sports",
    rating: 4.5,
    stock: 40,
  },
  {
    id: "33",
    name: "Swimming Goggles",
    description:
      "Anti-fog swimming goggles with UV protection and adjustable strap.",
    price: 24.99,
    image: "/swimming-goggles.png",
    category: "sports",
    rating: 4.2,
    stock: 35,
  },
  {
    id: "34",
    name: "Foam Roller",
    description:
      "High-density foam roller for muscle recovery and injury prevention.",
    price: 39.99,
    image: "/foam-roller.png",
    category: "sports",
    rating: 4.6,
    stock: 18,
  },
];
