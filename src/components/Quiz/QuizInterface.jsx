import React from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { useSkincareQuiz } from "@/contexts/SkincareQuizContext";
import { useHaircareQuiz } from "@/contexts/HaircareQuizContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackQuizEvents } from "@/utils/analytics";

const QuizInterface = ({ quizType = "combined" }) => {
  // Use the appropriate context based on quiz type
  let quizContext;
  
  if (quizType === "skincare") {
    quizContext = useSkincareQuiz();
  } else if (quizType === "haircare") {
    quizContext = useHaircareQuiz();
  } else {
    quizContext = useQuiz(); // Legacy combined quiz
  }

  const {
    currentQuestion,
    totalQuestions,
    answers,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getProgress,
    getCurrentQuestion,
    canProceed,
    language
  } = quizContext;

  const question = getCurrentQuestion();
  const progress = getProgress();

  const handleAnswerSelect = (answerId) => {
    const selectedAnswer = question.answers.find(a => a.id === answerId);
    answerQuestion(question.id, selectedAnswer);
    
    // Track answer selection
    trackQuizEvents.questionAnswered(question.id, selectedAnswer.mapping);
  };

  const texts = {
    en: {
      question: "Question",
      of: "of",
      previous: "Previous",
      next: "Next",
      finish: "Get My Routine",
      optional: "(Optional)"
    },
    de: {
      question: "Frage",
      of: "von",
      previous: "Zurück", 
      next: "Weiter",
      finish: "Meine Routine erhalten",
      optional: "(Optional)"
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              {t.question} {currentQuestion + 1} {t.of} {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-soft border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 leading-relaxed">
              {question.question}
              {question.optional && (
                <span className="text-sm text-muted-foreground ml-2">{t.optional}</span>
              )}
            </h2>

            <RadioGroup
              value={answers[question.id]?.id || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {question.answers.map((answer) => (
                <div key={answer.id} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={answer.id}
                    id={answer.id}
                    className="text-sage"
                  />
                  <Label
                    htmlFor={answer.id}
                    className="text-base leading-relaxed cursor-pointer flex-1 py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                  >
                    {answer.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.previous}
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-sage hover:bg-sage-dark text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-300"
          >
            {currentQuestion === totalQuestions - 1 ? t.finish : t.next}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;