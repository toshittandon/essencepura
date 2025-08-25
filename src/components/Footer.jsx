import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Sprout, Leaf, Heart, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-sage/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="font-serif text-2xl font-semibold text-foreground mb-4 block">
                Essence Pura
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Crafting organic self-care essentials that honor both your skin and the environment. 
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-sage hover:bg-sage hover:text-primary-foreground">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-sage hover:bg-sage hover:text-primary-foreground">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-sage hover:bg-sage hover:text-primary-foreground">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-sage hover:bg-sage hover:text-primary-foreground">
                  <Mail className="h-5 w-5" />
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
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border-sage/30 focus:border-sage"
                />
                <Button className="w-full bg-sage hover:bg-sage-dark text-primary-foreground">
                  Subscribe
                </Button>
              </div>
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