import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ShopQuizBanner = () => {
  const navigate = useNavigate();

  const handleNavigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full mb-8">
      <Card className="overflow-hidden shadow-soft border-0 bg-gradient-to-r from-sage/5 to-sage/10">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-sage" />
              <span className="text-sage font-semibold text-sm uppercase tracking-wide">
                Find Your Perfect Match
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground">
              Take our personalized quizzes to discover products tailored just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Skincare Quiz Button */}
            <Button 
              size="lg" 
              className="w-full bg-sage hover:bg-sage-dark text-primary-foreground py-4 group shadow-soft hover:shadow-medium transition-all duration-300"
              onClick={() => handleNavigateToTop('/quiz/skincare')}
            >
              Find Your Skincare Routine
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Haircare Quiz Button */}
            <Button 
              size="lg" 
              variant="outline"
              className="w-full border-sage text-sage hover:bg-sage hover:text-primary-foreground py-4 group transition-all duration-300"
              onClick={() => handleNavigateToTop('/quiz/haircare')}
            >
              Find Your Haircare Routine
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4">
            ✨ 2-minute quizzes • Instant results • 15% off complete routines
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopQuizBanner;