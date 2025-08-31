import { useState, useEffect } from "react";
import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const FeaturedProducts = ({ limit = 6 }) => {
    const { products, isLoading, error } = useProducts();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();

    const handleNavigateToTop = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (products.length > 0) {
            // Get the first 'limit' number of products for featured display
            setFeaturedProducts(products.slice(0, limit));
        }
    }, [products, limit]);

    if (error) {
        return (
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-red-600">Error loading products: {error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-4"
                    >
                        Retry
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Featured Products
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our most popular organic skincare essentials, carefully selected to give you a taste of our premium collection.
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading featured products...</p>
                    </div>
                )}

                {/* Featured Products Grid */}
                {!isLoading && featuredProducts.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.$id} product={product} />
                            ))}
                        </div>

                        {/* Shop All Button */}
                        <div className="text-center">
                            <Button
                                size="lg"
                                className="bg-sage hover:bg-sage-dark text-primary-foreground px-8 py-3 shadow-soft hover:shadow-medium transition-all duration-300"
                                onClick={() => handleNavigateToTop('/shop')}
                            >
                                View All Products
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </>
                )}

                {/* No Products Found */}
                {!isLoading && featuredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No featured products available</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => handleNavigateToTop('/shop')}
                        >
                            Browse Shop
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;