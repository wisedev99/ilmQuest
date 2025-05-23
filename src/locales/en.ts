// src/locales/en.ts
export default {
  appName: 'IlmQuest',
  dashboard: {
    title: 'Welcome back, {name}!',
    description: "Here's what's new on IlmQuest. Ready to learn or share?",
    askQuestion: 'Ask Question',
    browseQuestions: 'Browse Questions',
  },
  popularQuestions: {
    title: 'Popular Questions',
    viewAll: 'View All Questions',
  },
  header: {
    searchPlaceholder: 'Search questions...',
    askQuestionTooltip: 'Ask Question',
    notificationsTooltip: 'Toggle notifications',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Log out',
    languageSwitcherTooltip: 'Change language',
  },
  home: {
    welcomeMessage: 'Welcome to {appName}',
    tagline: 'Your trusted platform for seeking and sharing Islamic knowledge. Ask questions, get answers from verified Ulama, and deepen your understanding.',
    askQuestionButton: 'Ask a Question',
    browseQuestionsButton: 'Browse Questions',
    login: 'Log In',
    signup: 'Sign Up',
  }
} as const;
