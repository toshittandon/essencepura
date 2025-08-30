import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSEOData } from "@/utils/seo";

const Ingredients = () => {
  const seoData = getSEOData('ingredients');
  
  const ingredients = [
    {
      name: "Organic Jojoba Oil",
      benefits: "Deep moisturizing, non-comedogenic, rich in vitamin E",
      description: "Sourced from the Arizona desert, our organic jojoba oil closely mimics skin's natural sebum for optimal absorption."
    },
    {
      name: "Botanical Hyaluronic Acid",
      benefits: "Intense hydration, plumping effect, anti-aging",
      description: "Plant-derived hyaluronic acid that holds up to 1000 times its weight in water for ultimate skin hydration."
    },
    {
      name: "Rosehip Seed Oil",
      benefits: "Vitamin C, skin repair, brightening",
      description: "Cold-pressed from Chilean roses, packed with essential fatty acids and natural retinoids for skin renewal."
    },
    {
      name: "Chamomile Extract",
      benefits: "Soothing, anti-inflammatory, calming",
      description: "Gentle botanical extract that reduces redness and irritation while promoting healthy skin barrier function."
    },
    {
      name: "Green Tea Extract",
      benefits: "Antioxidant protection, anti-aging, purifying",
      description: "Rich in polyphenols and catechins that protect against environmental damage and promote cellular regeneration."
    },
    {
      name: "Aloe Vera",
      benefits: "Healing, hydrating, cooling",
      description: "Pure aloe gel from organically grown plants provides immediate soothing relief and long-lasting moisture."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pure Ingredients
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every ingredient in our formulations is carefully selected for its purity, sustainability, and proven benefits. 
              We believe in transparency, which is why we share the story behind each botanical component.
            </p>
          </div>

          {/* Ingredients Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-soft border border-border">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {ingredient.name}
                </h3>
                <div className="mb-4">
                  <span className="text-sm font-medium text-sage">Key Benefits:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ingredient.benefits}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sourcing Section */}
          <div className="bg-gradient-to-br from-sage/10 to-terracotta/10 p-12 rounded-lg">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Sustainable Sourcing
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We partner with organic farms and ethical suppliers around the world who share our commitment 
                to environmental stewardship. Our ingredients are harvested using sustainable practices that 
                protect biodiversity and support local communities.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-sage mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Organic Certified</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sage mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Countries Sourced</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-sage mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Partner Farms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ingredients;