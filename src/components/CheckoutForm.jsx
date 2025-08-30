import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { orderService } from "@/services/appwrite";
import { toast } from "sonner";

const CheckoutForm = ({ shippingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, getTotalPrice, customPackagingName, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required"
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded, create order in Appwrite
        try {
          const subtotal = getTotalPrice();
          const tax = subtotal * 0.08;
          const total = subtotal + tax;

          const orderData = {
            userId: user.$id,
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              isBundle: item.isBundle || false
            })),
            subtotal: subtotal,
            tax: tax,
            total: total,
            shippingAddress: shippingAddress || {},
            paymentIntentId: paymentIntent.id,
            status: 'completed',
            customPackagingName: customPackagingName.trim() || null
          };

          await orderService.createOrder(orderData);
          
          // Clear cart and redirect
          clearCart();
          toast.success("Order placed successfully!");
          navigate("/payment-success");
          
        } catch (orderError) {
          console.error("Error creating order:", orderError);
          toast.error("Payment succeeded but order creation failed. Please contact support.");
          // Still redirect to success page since payment went through
          navigate("/payment-success");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("An unexpected error occurred during payment.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-sage hover:bg-sage-dark"
        size="lg"
      >
        <span id="button-text">
          {isLoading ? "Processing..." : "Pay Now"}
        </span>
      </Button>
      
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-600 text-sm">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;