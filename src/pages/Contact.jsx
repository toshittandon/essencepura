import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or need personalized skincare advice? 
              We'd love to help you on your natural beauty journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      First Name
                    </label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Last Name
                    </label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input type="email" placeholder="Enter your email" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <Input placeholder="How can we help you?" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-sage hover:bg-sage-dark text-primary-foreground"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Visit our studio
                </h2>
                <p className="text-muted-foreground mb-8">
                  Experience our products in person at our flagship location in the heart of the botanical district.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Botanical Avenue<br />
                      Green District, California 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@terrabotanica.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-sage mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9AM - 7PM</p>
                      <p>Saturday: 10AM - 6PM</p>
                      <p>Sunday: 11AM - 5PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-sage/10 p-6 rounded-lg">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Frequently Asked
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Product recommendations?</p>
                    <p className="text-muted-foreground">We offer free consultations to help find your perfect routine.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Shipping & returns?</p>
                    <p className="text-muted-foreground">Free shipping over $50, 30-day return policy.</p>
                  </div>
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

export default Contact;