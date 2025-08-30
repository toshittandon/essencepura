import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, Navigate } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
import stripePromise from "@/lib/stripe";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { getSEOData } from "@/utils/seo";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { toast } from "sonner";

const Checkout = () => {
  const { items, getTotalPrice, getTotalItems, updateQuantity, removeFromCart, customPackagingName } = useCart();
  const { isAuthenticated } = useUser();
  const seoData = getSEOData('checkout');
  const { getProduct } = useProducts();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingProducts, setIsValidatingProducts] = useState(true);
  const [productValidationErrors, setProductValidationErrors] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: ""
  });

  // Validate products against Appwrite data on mount
  useEffect(() => {
    const validateProducts = async () => {
      setIsValidatingProducts(true);
      const errors = [];
      
      try {
        for (const item of items) {
          try {
            const currentProduct = await getProduct(item.id || item.$id);
            
            // Check if product still exists
            if (!currentProduct) {
              errors.push({
                type: 'not_found',
                item,
                message: `${item.name} is no longer available`
              });
              continue;
            }
            
            // Check stock availability
            if (currentProduct.stock !== undefined && currentProduct.stock < item.quantity) {
              errors.push({
                type: 'insufficient_stock',
                item,
                currentProduct,
                message: `Only ${currentProduct.stock} ${item.name} available (you have ${item.quantity} in cart)`
              });
            }
            
            // Check price changes
            if (currentProduct.price !== item.price) {
              errors.push({
                type: 'price_change',
                item,
                currentProduct,
                message: `Price for ${item.name} has changed from $${item.price} to $${currentProduct.price}`
              });
            }
            
          } catch (error) {
            console.error(`Error validating product ${item.id}:`, error);
            errors.push({
              type: 'validation_error',
              item,
              message: `Unable to validate ${item.name}`
            });
          }
        }
        
        setProductValidationErrors(errors);
        
        // Show toast for errors
        if (errors.length > 0) {
          toast.error(`${errors.length} item(s) in your cart need attention`);
        }
        
      } catch (error) {
        console.error('Error validating products:', error);
        toast.error('Unable to validate cart items');
      } finally {
        setIsValidatingProducts(false);
      }
    };
    
    if (items.length > 0) {
      validateProducts();
    } else {
      setIsValidatingProducts(false);
    }
  }, [items, getProduct]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to cart if empty
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Handle product validation errors
  const handleFixStockIssue = (error) => {
    if (error.type === 'insufficient_stock') {
      updateQuantity(error.item.id, error.currentProduct.stock);
      toast.success(`Updated ${error.item.name} quantity to ${error.currentProduct.stock}`);
    } else if (error.type === 'not_found') {
      removeFromCart(error.item.id);
      toast.success(`Removed ${error.item.name} from cart`);
    }
  };

  const handleCreatePaymentIntent = async () => {
    // Don't proceed if there are validation errors
    if (productValidationErrors.length > 0) {
      toast.error('Please resolve cart issues before proceeding');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Re-validate products one more time before payment
      const validatedItems = [];
      
      for (const item of items) {
        try {
          const currentProduct = await getProduct(item.id || item.$id);
          
          if (!currentProduct) {
            throw new Error(`${item.name} is no longer available`);
          }
          
          if (currentProduct.stock !== undefined && currentProduct.stock < item.quantity) {
            throw new Error(`Insufficient stock for ${item.name}`);
          }
          
          // Use current price from Appwrite
          validatedItems.push({
            id: currentProduct.$id,
            name: currentProduct.name,
            price: currentProduct.price, // Use current price
            quantity: item.quantity,
          });
          
        } catch (error) {
          console.error(`Product validation failed for ${item.name}:`, error);
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
      }
      
      // Calculate total with current prices
      const validatedTotal = validatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const validatedTax = validatedTotal * 0.08;
      const finalTotal = validatedTotal + validatedTax;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: validatedItems,
          total: Math.round(finalTotal * 100), // Convert to cents
        }),
      });

      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error('Failed to create payment intent');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Failed to create payment session');
    } finally {
      setIsLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#8B9A7A', // sage color
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Complete your order securely
            </p>
          </div>

          {/* Product Validation Errors */}
          {productValidationErrors.length > 0 && (
            <div className="mb-8">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium text-orange-800">Cart items need attention:</p>
                    {productValidationErrors.map((error, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-orange-700">{error.message}</span>
                        {(error.type === 'insufficient_stock' || error.type === 'not_found') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFixStockIssue(error)}
                            className="ml-2"
                          >
                            Fix
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Loading State */}
          {isValidatingProducts && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Validating cart items...</p>
            </div>
          )}

          {!isValidatingProducts && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Order Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-warm-white to-cream rounded-lg overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {!clientSecret ? (
                    <div className="space-y-6">
                      {/* Shipping Address Form */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              placeholder="John"
                              value={shippingAddress.firstName}
                              onChange={(e) => setShippingAddress(prev => ({...prev, firstName: e.target.value}))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Doe"
                              value={shippingAddress.lastName}
                              onChange={(e) => setShippingAddress(prev => ({...prev, lastName: e.target.value}))}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            placeholder="123 Main St"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress(prev => ({...prev, address: e.target.value}))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              placeholder="New York"
                              value={shippingAddress.city}
                              onChange={(e) => setShippingAddress(prev => ({...prev, city: e.target.value}))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input 
                              id="zipCode" 
                              placeholder="10001"
                              value={shippingAddress.zipCode}
                              onChange={(e) => setShippingAddress(prev => ({...prev, zipCode: e.target.value}))}
                            />
                          </div>
                        </div>
                        
                        {/* Show custom packaging name if set */}
                        {customPackagingName && (
                          <div className="p-3 bg-sage/5 rounded-lg border border-sage/20">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Package will be personalized for:</span> {customPackagingName}
                            </p>
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={handleCreatePaymentIntent}
                        disabled={isLoading || productValidationErrors.length > 0 || !shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode}
                        className="w-full bg-sage hover:bg-sage-dark disabled:opacity-50"
                        size="lg"
                      >
                        {isLoading ? "Processing..." : 
                         productValidationErrors.length > 0 ? "Resolve Cart Issues First" :
                         (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.zipCode) ? "Complete Shipping Address" :
                         "Continue to Payment"}
                      </Button>
                    </div>
                  ) : (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm shippingAddress={shippingAddress} />
                    </Elements>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          )}

          {/* Back to Cart */}
          <div className="mt-8 text-center">
            <Link to="/cart" className="text-muted-foreground hover:text-foreground">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;