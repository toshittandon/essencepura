import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Clock, Target, Gift } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const QuizCTA = () => {
  const navigate = useNavigate();

  const handleNavigateToTop = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 px-4 bg-sage/5">
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden shadow-soft border-0 bg-card">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-sage" />
                  <span className="text-sage font-semibold text-sm uppercase tracking-wide">
                    Personalized for You
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Find Your Perfect Routine
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6">
                  Take our personalized quizzes to get tailored skincare and haircare 
                  recommendations for your unique needs.
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-sage mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">2 Minutes</p>
                    <p className="text-xs text-muted-foreground">Quick & Easy</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-sage mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Personalized</p>
                    <p className="text-xs text-muted-foreground">Just for You</p>
                  </div>
                  <div className="text-center">
                    <Gift className="w-8 h-8 text-sage mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">15% Off</p>
                    <p className="text-xs text-muted-foreground">Bundle Discount</p>
                  </div>
                </div>

                {/* Primary CTA */}
                <Button 
                  size="lg" 
                  className="w-full bg-sage hover:bg-sage-dark text-primary-foreground px-8 py-4 text-lg group mb-4 shadow-soft hover:shadow-medium transition-all duration-300"
                  onClick={() => handleNavigateToTop('/quiz/skincare')}
                >
                  Start your skin quiz
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Secondary CTA */}
                <div className="text-center">
                  <button 
                    onClick={() => handleNavigateToTop('/quiz/haircare')}
                    className="text-sage hover:text-sage-dark font-medium underline transition-colors duration-200"
                  >
                    Or, discover your haircare ritual
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mt-4 text-center">
                  ✨ Get instant recommendations • No email required • 100% free
                </p>
              </div>

              {/* Visual Side */}
              <div className="bg-gradient-to-br from-sage/10 to-sage/20 p-8 lg:p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-sage/20 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-sage/30 rounded-full opacity-60"></div>
                  
                  {/* Main visual */}
                  <div className="relative bg-card rounded-2xl p-8 shadow-soft">
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 text-sage mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Your Perfect Match
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Discover products that work specifically for your skin and hair type
                      </p>
                      
                      {/* Mock quiz preview */}
                      <div className="mt-6 space-y-3">
                        <div className="bg-muted rounded-lg p-3 text-left">
                          <p className="text-sm font-medium text-foreground">
                            How does your skin feel at the end of the day?
                          </p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 border-2 border-sage rounded-full bg-sage"></div>
                              <span className="text-xs text-muted-foreground">Comfortable and balanced</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-sage/10 rounded-lg p-3">
                          <p className="text-xs text-sage-dark font-medium">
                            ✓ Perfect! We'll recommend gentle, balancing products for you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuizCTA;