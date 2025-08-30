import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Sprout, Leaf, Heart, Recycle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterService } from "@/services/appwrite";
import { toast } from "sonner";

// Custom TikTok Icon Component
const TikTokIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.294-1.98-1.294-3.338h-3.239v14.19c0 1.308-1.065 2.372-2.372 2.372s-2.372-1.064-2.372-2.372c0-1.307 1.065-2.371 2.372-2.371.26 0 .509.042.744.12V9.756a6.131 6.131 0 0 0-.744-.046c-3.368 0-6.097 2.729-6.097 6.097S7.468 21.904 10.836 21.904s6.097-2.729 6.097-6.097V9.370a9.094 9.094 0 0 0 5.388 1.744V7.875a5.884 5.884 0 0 1-3-2.313z"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // 'success', 'error', or null

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      await newsletterService.subscribe(email, '', 'footer');
      setSubscriptionStatus('success');
      setEmail("");
      toast.success("Successfully subscribed to our newsletter!");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionStatus('error');
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-sage/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <div className="flex mb-2">
                  <img 
                    src="/uploads/1.png" 
                    alt="Pura Essence Logo" 
                    className="h-16 w-auto"
                  />
                </div>
                <Link to="/" className="font-serif text-2xl font-semibold text-foreground block">
                  Essence Pura
                </Link>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Crafting organic self-care essentials that honor both your skin and the environment. 
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-sage hover:bg-sage hover:text-primary-foreground"
                  asChild
                >
                  <a href="https://www.instagram.com/essencepuraofficial/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-sage hover:bg-sage hover:text-primary-foreground"
                  asChild
                >
                  <a href="https://www.facebook.com/share/174U2sA5iX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-sage hover:bg-sage hover:text-primary-foreground"
                  asChild
                >
                  <a href="https://www.tiktok.com/@essencepuraofficial?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
                    <TikTokIcon className="h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-sage hover:bg-sage hover:text-primary-foreground"
                  asChild
                >
                  <Link to="/contact">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Shop All", href: "/shop" },
                  { name: "New Arrivals", href: "/shop" },
                  { name: "Best Sellers", href: "/shop" },
                  { name: "Gift Sets", href: "/shop" },
                  { name: "Sale", href: "/shop" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-sage transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "Shipping Info", href: "/contact" },
                  { name: "Returns", href: "/contact" },
                  { name: "FAQ", href: "/contact" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-sage transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Subscribe to our Newsletter !!!
              </h3>
              <p className="text-muted-foreground mb-4">
                Subscribe for beauty tips, new product launches, and exclusive offers.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-background border-sage/30 focus:border-sage"
                  disabled={isSubscribing}
                  required
                />
                
                {/* Status Messages */}
                {subscriptionStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Successfully subscribed!</span>
                  </div>
                )}

                {subscriptionStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Subscription failed. Please try again.</span>
                  </div>
                )}
                
                <Button 
                  type="submit"
                  className="w-full bg-sage hover:bg-sage-dark text-primary-foreground"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-sm text-muted-foreground">
                © 2025 Essence Pura. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-sage transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-sage transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-muted-foreground">
                <Sprout className="w-3 h-3 text-sage mr-2" />
                100% Vegan
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Leaf className="w-3 h-3 text-sage mr-2" />
                100% Organic
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Heart className="w-3 h-3 text-sage mr-2" />
                Cruelty-Free
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Recycle className="w-3 h-3 text-sage mr-2" />
                Sustainable Packaging
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;