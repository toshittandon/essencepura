import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getProductImageUrl } from "@/utils/imageUtils";
import OptimizedImage from "@/components/OptimizedImage";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // Use Appwrite document ID for routing
  const productId = product.$id || product.id;
  
  // Get the product image URL using the utility function
  const productImageUrl = getProductImageUrl(product);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Check if user is authenticated before adding to cart
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      navigate("/login");
      return;
    }

    // Check stock availability
    if (product.stock !== undefined && product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    // Convert Appwrite product format to cart format
    const cartProduct = {
      id: productId,
      $id: productId,
      name: product.name,
      price: product.price,
      image: productImageUrl,
      category: product.category,
      stock: product.stock
    };

    addToCart(cartProduct);
    toast.success(`${product.name} added to cart!`);
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    // You can implement wishlist functionality here
  };

  return (
    <Link to={`/product/${productId}`}>
      <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-product transition-all duration-300 bg-card">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-warm-white to-cream p-4 overflow-hidden">
            <OptimizedImage
              product={product}
              alt={`${product.name} product image`}
              className="rounded-lg"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="secondary" className="bg-sage text-sage-foreground">
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="secondary" className="bg-terracotta text-white">
                Bestseller
              </Badge>
            )}
            {product.stock !== undefined && product.stock <= 0 && (
              <Badge variant="destructive">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>

          {/* Quick Add Button */}
          <Button
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-sage hover:bg-sage-dark text-primary-foreground disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={product.stock !== undefined && product.stock <= 0}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {product.stock !== undefined && product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>

        <CardContent className="p-6">
          {/* Category */}
          <p className="text-sm text-muted-foreground mb-2 font-medium">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-semibold mb-3 text-foreground group-hover:text-sage transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-foreground">
              €{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Info */}
          {product.stock !== undefined && (
            <p className="text-xs text-muted-foreground mb-2">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          )}

          {/* Key Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.benefits.slice(0, 2).map((benefit, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-sage/10 text-sage-dark rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;