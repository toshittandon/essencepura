import React from "react";
import { useHaircareQuiz } from "@/contexts/HaircareQuizContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { trackQuizEvents } from "@/utils/analytics";

const HaircareQuizResults = () => {
    const { recommendations, language, customerName, getPrimaryConcerns, resetQuiz } = useHaircareQuiz();
    const { addToCart, addBundleToCart } = useCart();

    const { scalpConcern, hairConcern } = getPrimaryConcerns();

    const texts = {
        en: {
            title: "Your Personalized Haircare Routine is Here!",
            intro: (name, scalp, hair) =>
                `Hi ${name || "there"}! Based on your answers, we've curated the perfect haircare routine to help you achieve your goals of ${scalp.toLowerCase()} scalp care and ${hair.toLowerCase()} hair treatment.`,
            addCompleteRoutine: "Add Complete Routine to Cart (15% Off)",
            haircareRoutine: "Your Haircare Routine",
            washDay: "Wash Day Routine",
            styling: "Styling & Treatment",
            whyChosen: "Why we chose this for you:",
            addToCart: "Add to Cart",
            startOver: "Take Quiz Again",
            shopAll: "Shop All Products",
            crossPromo: "Your hair is covered. Now, find your perfect skincare match.",
            takeSkincareQuiz: "Take the Skincare Quiz"
        },
        de: {
            title: "Ihre personalisierte Haarpflege-Routine ist da!",
            intro: (name, scalp, hair) =>
                `Hallo ${name || ""}! Basierend auf Ihren Antworten haben wir die perfekte Haarpflegeroutine zusammengestellt, um Ihre Ziele von ${scalp.toLowerCase()} Kopfhautpflege und ${hair.toLowerCase()} Haarbehandlung zu erreichen.`,
            addCompleteRoutine: "Komplette Routine in den Warenkorb (15% Rabatt)",
            haircareRoutine: "Ihre Haarpflege-Routine",
            washDay: "Waschtag-Routine",
            styling: "Styling & Behandlung",
            whyChosen: "Warum wir das für Sie gewählt haben:",
            addToCart: "In den Warenkorb",
            startOver: "Quiz wiederholen",
            shopAll: "Alle Produkte ansehen",
            crossPromo: "Ihr Haar ist versorgt. Finden Sie nun Ihre perfekte Hautpflege.",
            takeSkincareQuiz: "Hautpflege-Quiz machen"
        }
    };

    const t = texts[language];

    // Mock product data
    const mockProducts = {
        "Shampoo - Anti-Hair Fall (Caffeine)": {
            id: "anti-hair-fall-shampoo",
            name: "Anti-Hair Fall Caffeine Shampoo",
            price: 28.99,
            image: "/Pura.png"
        },
        "Shampoo - Moisture Herbal": {
            id: "moisture-herbal-shampoo",
            name: "Moisture Herbal Shampoo",
            price: 26.99,
            image: "/Pura.png"
        },
        "Conditioner - Protein Strength": {
            id: "protein-strength-conditioner",
            name: "Protein Strength Conditioner",
            price: 24.99,
            image: "/Pura.png"
        },
        "Conditioner - Moisture & Frizz Control": {
            id: "moisture-frizz-conditioner",
            name: "Moisture & Frizz Control Conditioner",
            price: 24.99,
            image: "/Pura.png"
        },
        "Hair Mask - Bond Repair": {
            id: "bond-repair-mask",
            name: "Bond Repair Hair Mask",
            price: 32.99,
            image: "/Pura.png"
        },
        "Hair Mask - Hydration Boost": {
            id: "hydration-boost-mask",
            name: "Hydration Boost Hair Mask",
            price: 30.99,
            image: "/Pura.png"
        },
        "Hair Serum - Scalp Growth Serum": {
            id: "scalp-growth-serum",
            name: "Scalp Growth Serum",
            price: 38.99,
            image: "/Pura.png"
        },
        "Hair Serum - Leave-In Shine Serum": {
            id: "leave-in-shine-serum",
            name: "Leave-In Shine Serum",
            price: 29.99,
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
                        <span className="font-bold text-sage">${product.price}</span>
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

        // Add haircare products
        recommendations.haircare.forEach(rec => {
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
                    {allProducts.length} products • Save ${discountAmount.toFixed(2)} (15% off)
                </div>
            </div>
        );

        trackQuizEvents.routineAddedToCart(allProducts.length, originalTotal);
    };

    if (!recommendations) {
        return <div>Loading results...</div>;
    }

    // Separate products by type
    const washDayProducts = recommendations.haircare.filter(rec =>
        rec.slot === "Shampoo" || rec.slot === "Conditioner" || rec.slot === "Hair Mask"
    );

    const stylingProducts = recommendations.haircare.filter(rec =>
        rec.slot === "Scalp Treatment" || rec.slot === "Leave-In Treatment"
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage/10 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        {t.title}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
                        {t.intro(customerName, scalpConcern, hairConcern)}
                    </p>

                    {/* Pricing Summary */}
                    {(() => {
                        const allProducts = [];
                        recommendations.haircare.forEach(rec => {
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
                                    <span>${originalTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-terracotta mb-2">
                                    <span>Bundle Discount (15%)</span>
                                    <span>-${discountAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-foreground border-t pt-2">
                                    <span>Your Price</span>
                                    <span>${finalTotal.toFixed(2)}</span>
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

                {/* Haircare Routine */}
                <Card className="mb-8 shadow-soft border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl text-foreground">{t.haircareRoutine}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Wash Day Routine */}
                        {washDayProducts.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-foreground">{t.washDay}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {washDayProducts.map((rec, index) => (
                                        <ProductCard key={`wash-${index}`} recommendation={rec} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Styling & Treatment */}
                        {stylingProducts.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-foreground">{t.styling}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {stylingProducts.map((rec, index) => (
                                        <ProductCard key={`styling-${index}`} recommendation={rec} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* If no separation needed, show all products */}
                        {washDayProducts.length === 0 && stylingProducts.length === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {recommendations.haircare.map((rec, index) => (
                                    <ProductCard key={`hair-${index}`} recommendation={rec} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Cross-promotion CTA */}
                <Card className="mb-8 bg-gradient-to-r from-sage/5 to-sage/10 border-sage/20 shadow-soft">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {t.crossPromo}
                        </h3>
                        <Link to="/quiz/skincare">
                            <Button
                                size="lg"
                                className="bg-sage hover:bg-sage-dark text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-300"
                            >
                                {t.takeSkincareQuiz}
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

export default HaircareQuizResults;