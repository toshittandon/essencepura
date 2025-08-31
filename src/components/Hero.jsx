import { ArrowRight, Leaf, Heart, Recycle, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-warm-white via-cream to-beige overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex items-center justify-center mb-8">
          {/* Logo */}
            <img 
              src="/uploads/1.png" 
              alt="Pura Essence Logo" 
              className="h-48 w-auto"
            />
          </div>
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="">
            <span className="w-2 h-2 bg-sage rounded-full mr-2"></span>
            100% Organic & Cruelty-Free
          </div>

          {/* Main Heading */}
          <h1 className="bdscript-regular text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Essence
            <span className="text-sage"> of  You</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our collection of organic, sustainably-sourced cosmetics crafted with the finest botanical ingredients. 
            Gentle on your skin, kind to the earth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-sage hover:bg-sage-dark text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-300 inline-flex items-center"
              onClick={() => handleNavigateToTop('/shop')}
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-sage text-sage hover:bg-sage hover:text-primary-foreground transition-all duration-300"
              onClick={() => handleNavigateToTop('/about')}
            >
              Our Story
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center text-sm text-muted-foreground">
              <Leaf className="w-4 h-4 text-sage mr-2" />
              100% Organic
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-sage mr-2" />
              Cruelty-Free
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Recycle className="w-4 h-4 text-sage mr-2" />
              Sustainable Packaging
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Sprout className="w-4 h-4 text-sage mr-2" />
              100% Vegan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;