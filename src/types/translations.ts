
export interface NestedTranslations {
  [key: string]: string | NestedTranslations;
}

export interface Translations {
  appName: string;
  header: {
    searchPlaceholder: string;
    askQuestionTooltip: string;
    notificationsTooltip: string;
    profile: string;
    settings: string;
    logout: string;
    languageSwitcherTooltip: string;
  };
  home: {
    welcomeMessage: string;
    tagline: string;
    askQuestionButton: string;
    browseQuestionsButton: string;
    login: string;
    signup: string;
  };
  dashboard: {
    title: string; // Example: "Welcome back, {name}!"
    description: string;
    askQuestion: string;
    browseQuestions: string;
  };
  popularQuestions: {
    title: string;
    viewAll: string;
  };
  // Add other top-level keys as needed
}
