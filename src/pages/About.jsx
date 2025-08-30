import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSEOData } from "@/utils/seo";

const About = () => {
  const seoData = getSEOData('about');

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded on the belief that beauty should come from nature, Essence Pura was born from a passion 
              for creating skincare that's as pure as it is effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-6">
                We're committed to crafting organic cosmetics that honor both your skin and the environment. 
                Every product is thoughtfully formulated with sustainably sourced botanicals, ensuring you 
                receive the purest, most effective skincare nature has to offer.
              </p>
              <p className="text-muted-foreground">
                Our cruelty-free approach means we never test on animals, and our sustainable packaging 
                reflects our dedication to protecting the planet for future generations.
              </p>
            </div>
            <div className="bg-sage/10 p-8 rounded-lg">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                What Makes Us Different
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                  100% organic ingredients
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                  Cruelty-free & vegan
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                  Sustainable packaging
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                  Clinically tested
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="w-2 h-2 bg-sage rounded-full mr-3"></span>
                  Small-batch crafted
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-warm-white to-cream p-12 rounded-lg text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of a movement that celebrates natural beauty and sustainable living. 
              Follow our journey as we continue to innovate with nature's gifts.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-sage">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sage">25+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sage">5 Years</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;