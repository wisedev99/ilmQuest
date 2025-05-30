// src/locales/ru.ts
export default {
  appName: 'ИлмКвест',
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
    languageSwitcherTooltip: 'Сменить язык',
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
