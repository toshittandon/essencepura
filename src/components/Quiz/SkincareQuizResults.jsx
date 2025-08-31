import React from "react";
import { useSkincareQuiz } from "@/contexts/SkincareQuizContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Calendar, ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { trackQuizEvents } from "@/utils/analytics";

const SkincareQuizResults = () => {
  const { recommendations, language, customerName, getPrimaryConcerns, resetQuiz } = useSkincareQuiz();
  const { addToCart, addBundleToCart } = useCart();

  const { skinConcern, bodyConcern } = getPrimaryConcerns();

  const texts = {
    en: {
      title: "Your Personalized Skincare & Body Routine is Here!",
      intro: (name, skin, body) => 
        `Hi ${name || "there"}! Based on your answers, we've curated the perfect skincare routine to help you achieve your goals of ${skin.toLowerCase()} and ${body.toLowerCase()} body care.`,
      addCompleteRoutine: "Add Complete Routine to Cart (15% Off)",
      skincareRoutine: "Your Skincare Routine",
      bodycareRoutine: "Your Body & Lip Essentials",
      morning: "Morning",
      evening: "Evening",
      weekly: "Weekly",
      whyChosen: "Why we chose this for you:",
      addToCart: "Add to Cart",
      startOver: "Take Quiz Again",
      shopAll: "Shop All Products",
      crossPromo: "Great! Now, let's perfect your hair ritual.",
      takeHaircareQuiz: "Take the Haircare Quiz"
    },
    de: {
      title: "Ihre personalisierte Hautpflege- & Körperpflege-Routine ist da!",
      intro: (name, skin, body) => 
        `Hallo ${name || ""}! Basierend auf Ihren Antworten haben wir die perfekte Hautpflegeroutine zusammengestellt, um Ihre Ziele von ${skin.toLowerCase()} und ${body.toLowerCase()} Körperpflege zu erreichen.`,
      addCompleteRoutine: "Komplette Routine in den Warenkorb (15% Rabatt)",
      skincareRoutine: "Ihre Hautpflege-Routine",
      bodycareRoutine: "Ihre Körper- & Lippenpflege",
      morning: "Morgens",
      evening: "Abends", 
      weekly: "Wöchentlich",
      whyChosen: "Warum wir das für Sie gewählt haben:",
      addToCart: "In den Warenkorb",
      startOver: "Quiz wiederholen",
      shopAll: "Alle Produkte ansehen",
      crossPromo: "Großartig! Lassen Sie uns nun Ihr Haarritual perfektionieren.",
      takeHaircareQuiz: "Haarpflege-Quiz machen"
    }
  };

  const t = texts[language];

  // Mock product data
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
    },
    "Body Moisturizer - Urea Repair Lotion": {
      id: "urea-repair-lotion",
      name: "Urea Repair Body Lotion",
      price: 27.99,
      image: "/Pura.png"
    },
    "Body Moisturizer - Hydration Glow Lotion": {
      id: "hydration-glow-lotion",
      name: "Hydration Glow Body Lotion",
      price: 25.99,
      image: "/Pura.png"
    },
    "Lip Balm - Repair Balm": {
      id: "lip-repair-balm",
      name: "Repair Lip Balm",
      price: 12.99,
      image: "/Pura.png"
    },
    "Lip Balm - Plumping Tint Balm": {
      id: "lip-plump-balm",
      name: "Plumping Tint Lip Balm",
      price: 14.99,
      image: "/Pura.png"
    }
  };

  const ProductCard = ({ recommendation }) => {
    const product = mockProducts[recommendation.product] || {
      id: recommendation.product.toLowerCase().replace(/\s+/g, '-'),
      name: recommendation.product,
      price: 29.99,
      image: "/Pura.png"
    };

    const handleAddToCart = () => {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
      trackQuizEvents.individualProductAdded(product.name, product.price);
    };

    return (
      <Card className="h-full shadow-soft border-0 hover:shadow-medium transition-all duration-300">
        <CardContent className="p-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <h4 className="font-semibold text-sm mb-2 text-foreground">{product.name}</h4>
          <p className="text-xs text-muted-foreground mb-3">
            <span className="font-medium">{t.whyChosen}</span> {recommendation.reason}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sage">€{product.price}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-sage hover:bg-sage-dark text-primary-foreground shadow-soft transition-all duration-300"
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
    const allProducts = [];
    
    // Add skincare products
    [...recommendations.skincare.am, ...recommendations.skincare.pm, ...recommendations.skincare.weekly]
      .forEach(rec => {
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

    const originalTotal = allProducts.reduce((sum, p) => sum + p.price, 0);
    const discountAmount = originalTotal * 0.15;
    const finalTotal = originalTotal - discountAmount;

    addBundleToCart(allProducts);
    toast.success(
      <div className="text-sm">
        <div className="font-semibold">Complete routine added to cart!</div>
        <div className="text-xs text-muted-foreground mt-1">
          {allProducts.length} products • Save €{discountAmount.toFixed(2)} (15% off)
        </div>
      </div>
    );
    
    trackQuizEvents.routineAddedToCart(allProducts.length, originalTotal);
  };

  if (!recommendations) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            {t.intro(customerName, skinConcern, bodyConcern)}
          </p>
          
          {/* Pricing Summary */}
          {(() => {
            const allProducts = [];
            [...recommendations.skincare.am, ...recommendations.skincare.pm, ...recommendations.skincare.weekly]
              .forEach(rec => {
                const product = mockProducts[rec.product];
                if (product && !allProducts.find(p => p.id === product.id)) {
                  allProducts.push(product);
                }
              });
            [...recommendations.bodycare, ...recommendations.lipcare].forEach(rec => {
              const product = mockProducts[rec.product];
              if (product && !allProducts.find(p => p.id === product.id)) {
                allProducts.push(product);
              }
            });
            const originalTotal = allProducts.reduce((sum, p) => sum + p.price, 0);
            const discountAmount = originalTotal * 0.15;
            const finalTotal = originalTotal - discountAmount;
            
            return (
              <div className="bg-sage/5 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Complete Routine ({allProducts.length} products)</span>
                  <span>€{originalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-terracotta mb-2">
                  <span>Bundle Discount (15%)</span>
                  <span>-€{discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground border-t pt-2">
                  <span>Your Price</span>
                  <span>€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            );
          })()}
          
          <div className="relative inline-block">
            <Button 
              size="lg" 
              onClick={addCompleteRoutineToCart}
              className="bg-sage hover:bg-sage-dark text-primary-foreground px-8 py-3 text-lg shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t.addCompleteRoutine}
            </Button>
            <div className="absolute -top-2 -right-2 bg-terracotta text-white text-xs font-bold px-2 py-1 rounded-full shadow-soft">
              15% OFF
            </div>
          </div>
        </div>

        {/* Skincare Routine */}
        <Card className="mb-8 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
              <Sun className="w-6 h-6 text-terracotta" />
              {t.skincareRoutine}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Morning Routine */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-5 h-5 text-terracotta" />
                <h3 className="text-lg font-semibold text-foreground">{t.morning} ☀️</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.skincare.am.map((rec, index) => (
                  <ProductCard key={`am-${index}`} recommendation={rec} />
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Evening Routine */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5 text-sage-dark" />
                <h3 className="text-lg font-semibold text-foreground">{t.evening} 🌙</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.skincare.pm.map((rec, index) => (
                  <ProductCard key={`pm-${index}`} recommendation={rec} />
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Weekly Routine */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-sage" />
                <h3 className="text-lg font-semibold text-foreground">{t.weekly}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.skincare.weekly.map((rec, index) => (
                  <ProductCard key={`weekly-${index}`} recommendation={rec} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body & Lip Care */}
        <Card className="mb-8 shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">{t.bodycareRoutine}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...recommendations.bodycare, ...recommendations.lipcare].map((rec, index) => (
                <ProductCard key={`body-${index}`} recommendation={rec} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cross-promotion CTA */}
        <Card className="mb-8 bg-gradient-to-r from-sage/5 to-sage/10 border-sage/20 shadow-soft">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t.crossPromo}
            </h3>
            <Link to="/quiz/haircare">
              <Button 
                size="lg" 
                className="bg-sage hover:bg-sage-dark text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-300"
              >
                {t.takeHaircareQuiz}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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

export default SkincareQuizResults;