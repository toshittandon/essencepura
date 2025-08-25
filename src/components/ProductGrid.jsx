import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const filteredProducts = selectedCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show All Products Button */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-sage text-sage hover:bg-sage hover:text-primary-foreground"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;