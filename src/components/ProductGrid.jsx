import { useState, useEffect } from "react";
import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

const ProductGrid = () => {
  const { 
    products, 
    isLoading, 
    error, 
    getCategories, 
    getProductsByCategory,
    searchProducts 
  } = useProducts();
  
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = getCategories();

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, searchProducts]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when changing category
  };

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
            Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully curated skincare essentials made from the finest organic ingredients, 
            each product designed to nourish and enhance your natural beauty.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={`
                transition-all duration-300
                ${selectedCategory === category 
                  ? "bg-sage hover:bg-sage-dark text-primary-foreground shadow-soft" 
                  : "border-sage/30 text-sage hover:bg-sage hover:text-primary-foreground"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.$id} product={product} />
              ))}
            </div>

            {/* No Products Found */}
            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No products found for "${searchQuery}"`
                    : selectedCategory !== "All Products"
                    ? `No products found in ${selectedCategory}`
                    : "No products available"
                  }
                </p>
                {(searchQuery || selectedCategory !== "All Products") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Products");
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            {/* Results Count */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;