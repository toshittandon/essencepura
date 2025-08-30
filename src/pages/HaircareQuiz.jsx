import React, { useState } from "react";
import { HaircareQuizProvider, useHaircareQuiz } from "@/contexts/HaircareQuizContext";
import QuizInterface from "@/components/Quiz/QuizInterface";
import HaircareQuizResults from "@/components/Quiz/HaircareQuizResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Clock, Target, Gift } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const HaircareQuizWelcome = ({ onStart }) => {
  const { language, switchLanguage, setCustomerName, customerName, startQuiz } = useHaircareQuiz();

  const texts = {
    en: {
      title: "Find Your Perfect Haircare Routine",
      subtitle: "Get personalized haircare recommendations based on your unique scalp and hair needs",
      features: [
        { icon: Clock, title: "1 Minute", desc: "Quick haircare quiz" },
        { icon: Target, title: "Personalized", desc: "Tailored to your hair" },
        { icon: Gift, title: "15% Off", desc: "Bundle discount included" }
      ],
      nameLabel: "Your Name (Optional)",
      namePlaceholder: "Enter your name",
      languageLabel: "Language",
      startQuiz: "Start Your Haircare Quiz",
      howItWorks: "How It Works",
      steps: [
        "Answer 2 questions about your scalp and hair concerns",
        "Our algorithm analyzes your hair needs", 
        "Get your personalized wash day and styling routine",
        "Add individual products or the complete bundle to cart"
      ]
    },
    de: {
      title: "Finden Sie Ihre perfekte Haarpflege-Routine",
      subtitle: "Erhalten Sie personalisierte Haarpflegeempfehlungen basierend auf Ihren einzigartigen Kopfhaut- und Haarbedürfnissen",
      features: [
        { icon: Clock, title: "1 Minute", desc: "Schnelles Haarpflege-Quiz" },
        { icon: Target, title: "Personalisiert", desc: "Auf Ihr Haar zugeschnitten" },
        { icon: Gift, title: "15% Rabatt", desc: "Bundle-Rabatt inklusive" }
      ],
      nameLabel: "Ihr Name (Optional)",
      namePlaceholder: "Geben Sie Ihren Namen ein",
      languageLabel: "Sprache",
      startQuiz: "Starten Sie Ihr Haarpflege-Quiz",
      howItWorks: "So funktioniert es",
      steps: [
        "Beantworten Sie 2 Fragen zu Ihrer Kopfhaut und Ihren Haaranliegen",
        "Unser Algorithmus analysiert Ihre Haarbedürfnisse",
        "Erhalten Sie Ihre personalisierte Waschtag- und Styling-Routine", 
        "Fügen Sie einzelne Produkte oder das komplette Bundle zum Warenkorb hinzu"
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-soft border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-sage" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.title}
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-8 h-8 text-sage mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* User Input Form */}
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="language">{t.languageLabel}</Label>
                <Select value={language} onValueChange={switchLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name">{t.nameLabel}</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </div>

              <Button 
                size="lg" 
                className="w-full bg-sage hover:bg-sage-dark text-primary-foreground py-3 shadow-soft hover:shadow-medium transition-all duration-300"
                onClick={() => {
                  startQuiz();
                  onStart();
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t.startQuiz}
              </Button>
            </div>

            {/* How It Works */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-center mb-6">{t.howItWorks}</h3>
              <div className="space-y-4">
                {t.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sage text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const HaircareQuizContent = () => {
  const { isCompleted } = useHaircareQuiz();
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <HaircareQuizWelcome onStart={() => setShowWelcome(false)} />;
  }

  if (isCompleted) {
    return <HaircareQuizResults />;
  }

  return <QuizInterface quizType="haircare" />;
};

const HaircareQuiz = () => {
  return (
    <>
      <SEOHead 
        title="Haircare Quiz | Find Your Perfect Routine | Essence Pura"
        description="Take our haircare quiz to get personalized haircare recommendations. Get 15% off your complete routine bundle."
        keywords="haircare quiz, personalized haircare, organic haircare, vegan beauty, cruelty-free cosmetics"
      />
      <HaircareQuizProvider>
        <HaircareQuizContent />
      </HaircareQuizProvider>
    </>
  );
};

export default HaircareQuiz;