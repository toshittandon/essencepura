// Analytics tracking utilities for the quiz feature

export const trackEvent = (eventName, parameters = {}) => {
  // Google Analytics 4 tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }

  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters);
  }
};

export const trackQuizEvents = {
  started: () => trackEvent('quiz_started', {
    event_category: 'engagement',
    event_label: 'personalized_routine_quiz'
  }),

  questionAnswered: (questionId, answer) => trackEvent('quiz_question_answered', {
    event_category: 'engagement',
    event_label: 'quiz_progress',
    custom_parameters: {
      question_id: questionId,
      answer: answer
    }
  }),

  completed: (totalQuestions, completionTime) => trackEvent('quiz_completed', {
    event_category: 'engagement',
    event_label: 'personalized_routine_quiz',
    value: totalQuestions,
    custom_parameters: {
      completion_time_seconds: completionTime
    }
  }),

  routineAddedToCart: (productCount, totalValue) => trackEvent('add_to_cart', {
    event_category: 'ecommerce',
    event_label: 'complete_quiz_routine',
    value: totalValue,
    custom_parameters: {
      product_count: productCount,
      source: 'quiz_recommendation'
    }
  }),

  individualProductAdded: (productName, price) => trackEvent('add_to_cart', {
    event_category: 'ecommerce', 
    event_label: 'quiz_recommendation',
    value: price,
    custom_parameters: {
      product_name: productName,
      source: 'quiz_individual'
    }
  }),

  quizAbandoned: (questionNumber, totalQuestions) => trackEvent('quiz_abandoned', {
    event_category: 'engagement',
    event_label: 'quiz_dropout',
    custom_parameters: {
      question_reached: questionNumber,
      total_questions: totalQuestions,
      completion_percentage: Math.round((questionNumber / totalQuestions) * 100)
    }
  })
};

// Track page views for quiz pages
export const trackPageView = (pageName, additionalParams = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href,
      ...additionalParams
    });
  }
};