import React, { createContext, useContext, useState } from "react";
import { skincareQuizQuestions, generateSkincareRecommendations } from "@/data/quizData";
import { trackQuizEvents } from "@/utils/analytics";

const SkincareQuizContext = createContext(undefined);

export const useSkincareQuiz = () => {
  const context = useContext(SkincareQuizContext);
  if (!context) {
    throw new Error("useSkincareQuiz must be used within a SkincareQuizProvider");
  }
  return context;
};

export const SkincareQuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [language, setLanguage] = useState("en");
  const [customerName, setCustomerName] = useState("");
  const [startTime, setStartTime] = useState(null);

  const questions = skincareQuizQuestions[language];
  const totalQuestions = questions.length;

  const answerQuestion = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    const results = generateSkincareRecommendations(answers);
    setRecommendations(results);
    setIsCompleted(true);
    
    // Track quiz completion
    const completionTime = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    trackQuizEvents.completed(totalQuestions, completionTime);
  };

  const startQuiz = () => {
    setStartTime(Date.now());
    trackQuizEvents.started();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setRecommendations(null);
    setCustomerName("");
    setStartTime(null);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / totalQuestions) * 100;
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestion];
  };

  const isCurrentQuestionAnswered = () => {
    const current = getCurrentQuestion();
    return answers[current.id] !== undefined;
  };

  const canProceed = () => {
    const current = getCurrentQuestion();
    return current.optional || isCurrentQuestionAnswered();
  };

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    resetQuiz();
  };

  const getPrimaryConcerns = () => {
    const skinConcern = answers[2]?.mapping || "";
    const bodyConcern = answers[5]?.mapping || "";
    return { skinConcern, bodyConcern };
  };

  return (
    <SkincareQuizContext.Provider
      value={{
        // State
        currentQuestion,
        answers,
        isCompleted,
        recommendations,
        language,
        customerName,
        totalQuestions,
        
        // Actions
        answerQuestion,
        nextQuestion,
        previousQuestion,
        completeQuiz,
        resetQuiz,
        switchLanguage,
        setCustomerName,
        startQuiz,
        
        // Computed values
        getProgress,
        getCurrentQuestion,
        isCurrentQuestionAnswered,
        canProceed,
        getPrimaryConcerns,
      }}
    >
      {children}
    </SkincareQuizContext.Provider>
  );
};