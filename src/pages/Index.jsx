import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { Leaf, Heart, Recycle, Sprout } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
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