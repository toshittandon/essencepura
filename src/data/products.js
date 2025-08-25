import cleansingOilImg from "@/assets/product-cleansing-oil.jpg";
import faceSerumImg from "@/assets/product-face-serum.jpg";
import nightCreamImg from "@/assets/product-night-cream.jpg";
import eyeCreamImg from "@/assets/product-eye-cream.jpg";
import clayMaskImg from "@/assets/product-clay-mask.jpg";
import tonerMistImg from "@/assets/product-toner-mist.jpg";

export const products = [
  {
    id: "1",
    name: "Gentle Cleansing Oil",
    price: 48,
    originalPrice: 55,
    image: cleansingOilImg,
    category: "Cleansers",
    description: "A luxurious blend of organic plant oils that gently removes makeup and impurities while nourishing your skin.",
    ingredients: ["Jojoba Oil", "Rosehip Oil", "Chamomile Extract", "Vitamin E"],
    benefits: ["Deep cleansing", "Hydrating", "Anti-inflammatory"],
    isBestseller: true
  },
  {
    id: "2", 
    name: "Botanical Face Serum",
    price: 72,
    image: faceSerumImg,
    category: "Serums",
    description: "Concentrated botanical extracts deliver powerful antioxidants and vitamins for radiant, youthful skin.",
    ingredients: ["Hyaluronic Acid", "Vitamin C", "Green Tea Extract", "Aloe Vera"],
    benefits: ["Anti-aging", "Brightening", "Firming"],
    isNew: true
  },
  {
    id: "3",
    name: "Nourishing Night Cream",
    price: 65,
    image: nightCreamImg,
    category: "Moisturizers",
    description: "Rich, restorative cream works overnight to repair and rejuvenate your skin with organic botanicals.",
    ingredients: ["Shea Butter", "Peptides", "Lavender Oil", "Ceramides"],
    benefits: ["Deep hydration", "Overnight repair", "Calming"],
    isBestseller: true
  },
  {
    id: "4",
    name: "Illuminating Eye Cream",
    price: 56,
    image: eyeCreamImg,
    category: "Eye Care", 
    description: "Delicate formula reduces puffiness and dark circles while firming the eye area with natural actives.",
    ingredients: ["Caffeine", "Retinol", "Cucumber Extract", "Collagen"],
    benefits: ["Reduces puffiness", "Firms skin", "Brightens"],
    isNew: true
  },
  {
    id: "5",
    name: "Purifying Clay Mask",
    price: 42,
    image: clayMaskImg,
    category: "Masks",
    description: "Weekly treatment with mineral-rich clay draws out impurities while botanical extracts soothe and balance.",
    ingredients: ["Bentonite Clay", "Tea Tree Oil", "Calendula", "Zinc Oxide"],
    benefits: ["Detoxifying", "Pore minimizing", "Balancing"]
  },
  {
    id: "6", 
    name: "Hydrating Toner Mist",
    price: 38,
    image: tonerMistImg,
    category: "Toners",
    description: "Refreshing mist infused with organic florals and minerals to prep and hydrate your skin.",
    ingredients: ["Rose Water", "Hyaluronic Acid", "Glycerin", "Botanical Extracts"],
    benefits: ["Hydrating", "pH balancing", "Refreshing"],
    isBestseller: true
  }
];

export const categories = [
  "All Products",
  "Face",
  "Hair",
  "Eyes",
  "Body",
  "Gift Sets",
];