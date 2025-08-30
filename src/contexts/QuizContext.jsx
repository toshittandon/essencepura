import React, { createContext, useContext, useState } from "react";
import { quizQuestions, generateRecommendations } from "@/data/quizData";
import { trackQuizEvents } from "@/utils/analytics";

const QuizContext = createContext(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [language, setLanguage] = useState("en"); // Default to English
  const [customerName, setCustomerName] = useState("");
  const [startTime, setStartTime] = useState(null);

  const questions = quizQuestions[language];
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
    const results = generateRecommendations(answers);
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
    // Reset quiz when switching languages
    resetQuiz();
  };

  const getPrimaryConcerns = () => {
    const skinConcern = answers[2]?.mapping || "";
    const hairConcern = answers[6]?.mapping || "";
    return { skinConcern, hairConcern };
  };

  return (
    <QuizContext.Provider
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
    </QuizContext.Provider>
  );
};