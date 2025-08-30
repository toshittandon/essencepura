import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { QuizProvider, useQuiz } from "@/contexts/QuizContext";
import QuizInterface from "@/components/Quiz/QuizInterface";
import QuizResults from "@/components/Quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Clock, Target, Gift } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const QuizWelcome = ({ onStart }) => {
  const { language, switchLanguage, setCustomerName, customerName, startQuiz } = useQuiz();

  const texts = {
    en: {
      title: "Find Your Perfect Skincare Routine",
      subtitle: "Get personalized product recommendations based on your unique skin, hair, and body needs",
      features: [
        { icon: Clock, title: "2 Minutes", desc: "Quick and easy quiz" },
        { icon: Target, title: "Personalized", desc: "Tailored to your needs" },
        { icon: Gift, title: "15% Off", desc: "Bundle discount included" }
      ],
      nameLabel: "Your Name (Optional)",
      namePlaceholder: "Enter your name",
      languageLabel: "Language",
      startQuiz: "Start Your Personalized Quiz",
      howItWorks: "How It Works",
      steps: [
        "Answer 7 quick questions about your skin, hair, and body",
        "Our algorithm analyzes your responses", 
        "Get your personalized routine with product recommendations",
        "Add individual products or the complete bundle to cart"
      ]
    },
    de: {
      title: "Finden Sie Ihre perfekte Hautpflege-Routine",
      subtitle: "Erhalten Sie personalisierte Produktempfehlungen basierend auf Ihren einzigartigen Haut-, Haar- und Körperbedürfnissen",
      features: [
        { icon: Clock, title: "2 Minuten", desc: "Schnelles und einfaches Quiz" },
        { icon: Target, title: "Personalisiert", desc: "Auf Ihre Bedürfnisse zugeschnitten" },
        { icon: Gift, title: "15% Rabatt", desc: "Bundle-Rabatt inklusive" }
      ],
      nameLabel: "Ihr Name (Optional)",
      namePlaceholder: "Geben Sie Ihren Namen ein",
      languageLabel: "Sprache",
      startQuiz: "Starten Sie Ihr personalisiertes Quiz",
      howItWorks: "So funktioniert es",
      steps: [
        "Beantworten Sie 7 schnelle Fragen zu Ihrer Haut, Haaren und Körper",
        "Unser Algorithmus analysiert Ihre Antworten",
        "Erhalten Sie Ihre personalisierte Routine mit Produktempfehlungen", 
        "Fügen Sie einzelne Produkte oder das komplette Bundle zum Warenkorb hinzu"
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-emerald-600" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.title}
            </CardTitle>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
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
                    <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
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

const QuizContent = () => {
  const { isCompleted } = useQuiz();
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <QuizWelcome onStart={() => setShowWelcome(false)} />;
  }

  if (isCompleted) {
    return <QuizResults />;
  }

  return <QuizInterface />;
};

const Quiz = () => {
  // Redirect to skincare quiz (legacy route)
  return <Navigate to="/quiz/skincare" replace />;
};

export default Quiz;