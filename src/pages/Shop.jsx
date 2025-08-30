import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSEOData } from "@/utils/seo";

const Shop = () => {
  const seoData = getSEOData('shop');

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      <main>
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shop Natural Beauty
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Discover our complete collection of organic, cruelty-free cosmetics crafted with nature's finest ingredients.
            </p>
          </div>
        </div>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;