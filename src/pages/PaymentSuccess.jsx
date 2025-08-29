import { useEffect, useState } from "react";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const [orderNumber] = useState(`ORD-${Date.now().toString().slice(-6)}`);

  useEffect(() => {
    // In a real app, you might want to:
    // 1. Verify the payment with Stripe
    // 2. Create order in your database
    // 3. Send confirmation email
    console.log("Payment successful, order created:", orderNumber);
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your order. We've received your payment and will process your order shortly.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sage">
                  <Package className="h-5 w-5" />
                  <span className="font-semibold">Order Number: {orderNumber}</span>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• A confirmation email has been sent to your email address</p>
                  <p>• Your order will be processed within 1-2 business days</p>
                  <p>• You'll receive tracking information once your order ships</p>
                  <p>• Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link to="/profile">
              <Button className="bg-sage hover:bg-sage-dark" size="lg">
                View Order Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            
            <div>
              <Link to="/shop">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;