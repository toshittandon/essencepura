import React from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Calendar, ShoppingCart, Plus } from "lucide-react";
import { toast } from "sonner";
import { trackQuizEvents } from "@/utils/analytics";

const QuizResults = () => {
  const { recommendations, language, customerName, getPrimaryConcerns, resetQuiz } = useQuiz();
  const { addToCart, addBundleToCart } = useCart();

  const { skinConcern, hairConcern } = getPrimaryConcerns();

  const texts = {
    en: {
      title: "Your Personalized Essence Pura Routine is Here!",
      intro: (name, skin, hair) => 
        `Hi ${name || "there"}, based on your answers, we've curated the perfect routine to help you achieve your goals of ${skin.toLowerCase()} and ${hair.toLowerCase()}.`,
      addCompleteRoutine: "Add Complete Routine to Cart (15% Off)",
      skincareRoutine: "Your Skincare Routine",
      haircareRoutine: "Your Haircare Routine", 
      bodycareRoutine: "Your Body & Lip Essentials",
      morning: "Morning",
      evening: "Evening",
      weekly: "Weekly",
      whyChosen: "Why we chose this for you:",
      addToCart: "Add to Cart",
      startOver: "Take Quiz Again",
      shopAll: "Shop All Products"
    },
    de: {
      title: "Ihre personalisierte Essence Pura Routine ist da!",
      intro: (name, skin, hair) => 
        `Hallo ${name || ""}! Basierend auf Ihren Antworten haben wir die perfekte Routine zusammengestellt, um Ihre Ziele von ${skin.toLowerCase()} und ${hair.toLowerCase()} zu erreichen.`,
      addCompleteRoutine: "Komplette Routine in den Warenkorb (15% Rabatt)",
      skincareRoutine: "Ihre Hautpflege-Routine",
      haircareRoutine: "Ihre Haarpflege-Routine",
      bodycareRoutine: "Ihre Körper- & Lippenpflege",
      morning: "Morgens",
      evening: "Abends", 
      weekly: "Wöchentlich",
      whyChosen: "Warum wir das für Sie gewählt haben:",
      addToCart: "In den Warenkorb",
      startOver: "Quiz wiederholen",
      shopAll: "Alle Produkte ansehen"
    }
  };

  const t = texts[language];

  // Mock product data - in real implementation, this would come from your product database
  const mockProducts = {
    "Body Cleanser - Exfoliating Wash": {
      id: "exfoliating-wash",
      name: "Exfoliating Body Wash",
      price: 24.99,
      image: "/Pura.png"
    },
    "Body Cleanser - Gentle Sensitive Wash": {
      id: "gentle-wash", 
      name: "Gentle Sensitive Wash",
      price: 22.99,
      image: "/Pura.png"
    },
    "Face Serum - Brightening Vitamin C": {
      id: "vitamin-c-serum",
      name: "Brightening Vitamin C Serum", 
      price: 34.99,
      image: "/Pura.png"
    },
    "Face Serum - Repair & Anti-Wrinkle": {
      id: "anti-wrinkle-serum",
      name: "Repair & Anti-Wrinkle Serum",
      price: 39.99,
      image: "/Pura.png"
    },
    "Face Cream - Barrier Repair": {
      id: "barrier-repair-cream",
      name: "Barrier Repair Face Cream",
      price: 29.99,
      image: "/Pura.png"
    },
    "Face Cream - Anti-Wrinkle Peptide": {
      id: "peptide-cream",
      name: "Anti-Wrinkle Peptide Cream", 
      price: 32.99,
      image: "/Pura.png"
    },
    "Sunscreen - Mineral SPF 30": {
      id: "mineral-spf30",
      name: "Mineral Sunscreen SPF 30",
      price: 26.99,
      image: "/Pura.png"
    },
    "Sunscreen - Hybrid SPF 50+": {
      id: "hybrid-spf50",
      name: "Hybrid Sunscreen SPF 50+", 
      price: 28.99,
      image: "/Pura.png"
    }
    // Add more mock products as needed
  };

  const ProductCard = ({ recommendation, timeOfDay }) => {
    const product = mockProducts[recommendation.product] || {
      id: recommendation.product.toLowerCase().replace(/\s+/g, '-'),
      name: recommendation.product,
      price: 29.99,
      image: "/Pura.png"
    };

    const handleAddToCart = () => {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
      
      // Track individual product add to cart
      trackQuizEvents.individualProductAdded(product.name, product.price);
    };

    return (
      <Card className="h-full">
        <CardContent className="p-4">
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
          <p className="text-xs text-gray-600 mb-3">
            <span className="font-medium">{t.whyChosen}</span> {recommendation.reason}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-600">${product.price}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-3 h-3 mr-1" />
              {t.addToCart}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const addCompleteRoutineToCart = () => {
    // Collect all recommended products
    const allProducts = [];
    
    // Add skincare products
    [...recommendations.skincare.am, ...recommendations.skincare.pm, ...recommendations.skincare.weekly]
      .forEach(rec => {
        const product = mockProducts[rec.product];
        if (product && !allProducts.find(p => p.id === product.id)) {
          allProducts.push(product);
        }
      });
    
    // Add haircare products
    recommendations.haircare.forEach(rec => {
      const product = mockProducts[rec.product];
      if (product && !allProducts.find(p => p.id === product.id)) {
        allProducts.push(product);
      }
    });
    
    // Add bodycare products
    [...recommendations.bodycare, ...recommendations.lipcare].forEach(rec => {
      const product = mockProducts[rec.product];
      if (product && !allProducts.find(p => p.id === product.id)) {
        allProducts.push(product);
      }
    });

    // Add all products to cart as bundle
    addBundleToCart(allProducts);
    
    toast.success(`Complete routine added to cart with 15% discount! (${allProducts.length} products)`);
    
    // Track complete routine add to cart
    const totalValue = allProducts.reduce((sum, p) => sum + p.price, 0);
    trackQuizEvents.routineAddedToCart(allProducts.length, totalValue);
  };

  if (!recommendations) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            {t.intro(customerName, skinConcern, hairConcern)}
          </p>
          
          <Button 
            size="lg" 
            onClick={addCompleteRoutineToCart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {t.addCompleteRoutine}
          </Button>
        </div>

        {/* Skincare Routine */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sun className="w-6 h-6 text-yellow-500" />
              {t.skincareRoutine}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Morning Routine */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">{t.morning} ☀️</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.skincare.am.map((rec, index) => (
                  <ProductCard key={`am-${index}`} recommendation={rec} timeOfDay="morning" />
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Evening Routine */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">{t.evening} 🌙</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.skincare.pm.map((rec, index) => (
                  <ProductCard key={`pm-${index}`} recommendation={rec} timeOfDay="evening" />
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Weekly Routine */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold">{t.weekly}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.skincare.weekly.map((rec, index) => (
                  <ProductCard key={`weekly-${index}`} recommendation={rec} timeOfDay="weekly" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Haircare Routine */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{t.haircareRoutine}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.haircare.map((rec, index) => (
                <ProductCard key={`hair-${index}`} recommendation={rec} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Body & Lip Care */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{t.bodycareRoutine}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...recommendations.bodycare, ...recommendations.lipcare].map((rec, index) => (
                <ProductCard key={`body-${index}`} recommendation={rec} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Button variant="outline" onClick={resetQuiz}>
            {t.startOver}
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/shop'}>
            {t.shopAll}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;