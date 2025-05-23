// src/locales/ru.ts
export default {
  appName: 'ИлмКвест',
  // Add other Russian translations here
  dashboard: {
    title: 'С возвращением, {name}!',
    description: 'Вот что нового в ИлмКвест. Готовы учиться или делиться?',
    askQuestion: 'Задать вопрос',
    browseQuestions: 'Обзор вопросов',
  },
  popularQuestions: {
    title: 'Популярные вопросы',
    viewAll: 'Посмотреть все вопросы',
  },
  header: {
    searchPlaceholder: 'Поиск вопросов...',
    askQuestionTooltip: 'Задать вопрос',
    notificationsTooltip: 'Переключить уведомления',
    profile: 'Профиль',
    settings: 'Настройки',
    logout: 'Выйти',
    language: 'Язык',
  },
  home: {
    welcomeMessage: 'Добро пожаловать в {appName}',
    tagline: 'Ваша надежная платформа для поиска и обмена исламскими знаниями. Задавайте вопросы, получайте ответы от проверенных Улемов и углубляйте свое понимание.',
    askQuestionButton: 'Задать вопрос',
    browseQuestionsButton: 'Обзор вопросов',
    login: 'Войти',
    signup: 'Зарегистрироваться',
  }
} as const;
