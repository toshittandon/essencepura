import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import QuizCTA from "@/components/QuizCTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSEOData } from "@/utils/seo";
import { Leaf, Heart, Recycle, Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const seoData = getSEOData('home');

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      <main>
        <Hero />
        <QuizCTA />
        
        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get your personalized beauty routine in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Take Our Quiz",
                  description: "Answer a few quick questions about your skin type, concerns, and preferences. Our personalized quiz takes just 2 minutes.",
                  icon: "🧪"
                },
                {
                  step: "02", 
                  title: "Get Your Routine",
                  description: "Receive a customized skincare and haircare routine tailored specifically to your unique needs and goals.",
                  icon: "✨"
                },
                {
                  step: "03",
                  title: "Enjoy Beautiful Results",
                  description: "Follow your personalized routine and watch your skin and hair transform with our organic, cruelty-free products.",
                  icon: "🌿"
                }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <span className="text-3xl">{step.icon}</span>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    {/* Connecting Line (except for last item) */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-sage/20 transform translate-x-10"></div>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Link to="/quiz/skincare">
                <Button size="lg" className="bg-sage hover:bg-sage-dark text-primary-foreground px-8 py-3 shadow-soft hover:shadow-medium transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <ProductGrid />
        
        {/* Features Section */}
        <section className="py-16 bg-sage/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Essence Pura?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing you with the purest, most effective skincare products that nature has to offer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "100% Organic",
                  description: "Certified organic ingredients sourced from sustainable farms worldwide.",
                  icon: Leaf
                },
                {
                  title: "Cruelty-Free", 
                  description: "Never tested on animals. We believe in ethical beauty practices.",
                  icon: Heart
                },
                {
                  title: "Eco-Packaging",
                  description: "Sustainable packaging made from recycled and biodegradable materials.",
                  icon: Recycle
                },
                {
                  title: "Vegan",
                  description: "Formulated without any animal-derived ingredients.",
                  icon: Sprout
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-6 bg-card rounded-lg shadow-soft">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-sage" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;