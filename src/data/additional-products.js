// Additional product mock data - copy and paste these into your products array

export const additionalProducts = [
    {
        id: "7",
        name: "Vitamin C Brightening Cleanser",
        price: 52,
        originalPrice: 58,
        image: "/placeholder.svg", // Replace with actual image path
        category: "Cleansers",
        description: "Energizing gel cleanser with vitamin C and citrus extracts to brighten and refresh your complexion.",
        ingredients: ["Vitamin C", "Orange Extract", "Glycolic Acid", "Aloe Vera"],
        benefits: ["Brightening", "Gentle exfoliation", "Antioxidant protection"],
        isNew: true
    },
    {
        id: "8",
        name: "Retinol Renewal Serum",
        price: 89,
        image: "/placeholder.svg",
        category: "Serums",
        description: "Advanced anti-aging serum with encapsulated retinol for smoother, firmer skin with minimal irritation.",
        ingredients: ["Encapsulated Retinol", "Niacinamide", "Squalane", "Peptides"],
        benefits: ["Anti-aging", "Texture improvement", "Collagen boost"],
        isBestseller: true
    },
    {
        id: "9",
        name: "Hydrating Day Moisturizer SPF 30",
        price: 68,
        image: "/placeholder.svg",
        category: "Moisturizers",
        description: "Lightweight daily moisturizer with broad-spectrum SPF protection and hydrating botanicals.",
        ingredients: ["Zinc Oxide", "Hyaluronic Acid", "Green Tea", "Ceramides"],
        benefits: ["Sun protection", "Daily hydration", "Antioxidant defense"]
    },
    {
        id: "10",
        name: "Peptide Eye Renewal Complex",
        price: 78,
        originalPrice: 85,
        image: "/placeholder.svg",
        category: "Eye Care",
        description: "Intensive eye treatment with peptides and botanical extracts to target fine lines and crow's feet.",
        ingredients: ["Matrixyl 3000", "Argireline", "Vitamin K", "Arnica"],
        benefits: ["Reduces fine lines", "Improves elasticity", "Reduces dark circles"],
        isBestseller: true
    },
    {
        id: "11",
        name: "Exfoliating Enzyme Mask",
        price: 58,
        image: "/placeholder.svg",
        category: "Masks",
        description: "Gentle fruit enzyme mask that naturally exfoliates and brightens without harsh scrubbing.",
        ingredients: ["Papaya Enzyme", "Pineapple Extract", "Honey", "Oat Extract"],
        benefits: ["Gentle exfoliation", "Brightening", "Smoothing"],
        isNew: true
    },
    {
        id: "12",
        name: "Balancing Witch Hazel Toner",
        price: 35,
        image: "/placeholder.svg",
        category: "Toners",
        description: "Alcohol-free toner with witch hazel and botanical extracts to minimize pores and balance skin.",
        ingredients: ["Witch Hazel", "Niacinamide", "Chamomile", "Rose Hip Extract"],
        benefits: ["Pore minimizing", "Oil control", "Soothing"]
    },
    {
        id: "13",
        name: "Nourishing Hair Oil Treatment",
        price: 45,
        image: "/placeholder.svg",
        category: "Hair",
        description: "Luxurious blend of organic oils to deeply nourish and restore shine to dry, damaged hair.",
        ingredients: ["Argan Oil", "Coconut Oil", "Jojoba Oil", "Rosemary Extract"],
        benefits: ["Deep conditioning", "Shine enhancement", "Scalp nourishment"]
    },
    {
        id: "14",
        name: "Strengthening Hair Mask",
        price: 62,
        originalPrice: 70,
        image: "/placeholder.svg",
        category: "Hair",
        description: "Weekly intensive treatment mask with proteins and botanicals to repair and strengthen hair.",
        ingredients: ["Keratin", "Biotin", "Avocado Oil", "Silk Proteins"],
        benefits: ["Hair strengthening", "Damage repair", "Moisture restoration"],
        isBestseller: true
    },
    {
        id: "15",
        name: "Revitalizing Body Lotion",
        price: 48,
        image: "/placeholder.svg",
        category: "Body",
        description: "Fast-absorbing body lotion with organic botanicals and vitamins for soft, smooth skin.",
        ingredients: ["Shea Butter", "Vitamin E", "Lavender Oil", "Cocoa Butter"],
        benefits: ["Long-lasting hydration", "Skin softening", "Aromatherapy"]
    },
    {
        id: "16",
        name: "Exfoliating Body Scrub",
        price: 42,
        image: "/placeholder.svg",
        category: "Body",
        description: "Invigorating sugar scrub with essential oils to buff away dead skin and reveal radiant skin.",
        ingredients: ["Brown Sugar", "Sweet Almond Oil", "Vanilla Extract", "Sea Salt"],
        benefits: ["Gentle exfoliation", "Skin smoothing", "Circulation boost"],
        isNew: true
    },
    {
        id: "17",
        name: "Essential Skincare Gift Set",
        price: 125,
        originalPrice: 150,
        image: "/placeholder.svg",
        category: "Gift Sets",
        description: "Complete skincare routine featuring our bestselling cleanser, serum, and moisturizer.",
        ingredients: ["Multiple products included"],
        benefits: ["Complete routine", "Perfect for gifting", "Value savings"],
        isBestseller: true
    },
    {
        id: "18",
        name: "Luxury Spa Collection",
        price: 189,
        originalPrice: 220,
        image: "/placeholder.svg",
        category: "Gift Sets",
        description: "Premium collection of our most luxurious treatments for the ultimate at-home spa experience.",
        ingredients: ["Multiple premium products"],
        benefits: ["Spa experience", "Luxury formulations", "Complete pampering"]
    },
    {
        id: "19",
        name: "Gentle Micellar Water",
        price: 32,
        image: "/placeholder.svg",
        category: "Cleansers",
        description: "No-rinse micellar water that gently removes makeup and impurities without stripping the skin.",
        ingredients: ["Micellar Technology", "Rose Water", "Cucumber Extract", "Panthenol"],
        benefits: ["Gentle cleansing", "No-rinse formula", "Suitable for sensitive skin"]
    },
    {
        id: "20",
        name: "Overnight Repair Serum",
        price: 95,
        image: "/placeholder.svg",
        category: "Serums",
        description: "Potent nighttime serum with growth factors and peptides for intensive skin renewal while you sleep.",
        ingredients: ["Growth Factors", "Copper Peptides", "Bakuchiol", "Squalane"],
        benefits: ["Overnight repair", "Skin renewal", "Anti-aging"],
        isNew: true
    }
];

// Additional categories you might want to add
export const additionalCategories = [
    "Cleansers",
    "Serums",
    "Moisturizers",
    "Eye Care",
    "Masks",
    "Toners",
    "Hair",
    "Body",
    "Gift Sets",
    "New Arrivals",
    "Bestsellers"
];

// Sample product variations for different price ranges
export const budgetProducts = [
    {
        id: "21",
        name: "Daily Gentle Cleanser",
        price: 24,
        image: "/placeholder.svg",
        category: "Cleansers",
        description: "Affordable daily cleanser with natural ingredients for all skin types.",
        ingredients: ["Glycerin", "Chamomile", "Aloe Vera", "Coconut Oil"],
        benefits: ["Gentle cleansing", "Budget-friendly", "Daily use"]
    },
    {
        id: "22",
        name: "Basic Moisturizing Cream",
        price: 28,
        image: "/placeholder.svg",
        category: "Moisturizers",
        description: "Simple, effective moisturizer with essential hydrating ingredients.",
        ingredients: ["Hyaluronic Acid", "Glycerin", "Ceramides", "Vitamin E"],
        benefits: ["Basic hydration", "Affordable", "Non-comedogenic"]
    }
];

export const premiumProducts = [
    {
        id: "23",
        name: "Platinum Age-Defying Serum",
        price: 150,
        originalPrice: 175,
        image: "/placeholder.svg",
        category: "Serums",
        description: "Luxury anti-aging serum with rare botanical extracts and advanced peptide technology.",
        ingredients: ["Platinum Peptides", "Caviar Extract", "24K Gold", "Rare Orchid Extract"],
        benefits: ["Luxury anti-aging", "Premium ingredients", "Visible results"],
        isBestseller: true
    },
    {
        id: "24",
        name: "Diamond Radiance Face Mask",
        price: 120,
        image: "/placeholder.svg",
        category: "Masks",
        description: "Ultra-luxurious mask with diamond powder and precious minerals for instant radiance.",
        ingredients: ["Diamond Powder", "Platinum", "Pearl Extract", "Collagen"],
        benefits: ["Instant radiance", "Luxury treatment", "Special occasion"],
        isNew: true
    }
];