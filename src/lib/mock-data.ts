
import type { User, Question, Answer, Resource } from '@/types';
import { UserType } from '@/lib/constants';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Ali Hassan',
    email: 'ali@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    userType: UserType.Asker,
    followersCount: 15,
    followingCount: 5,
    questionsAsked: [],
    answersProvided: [],
    bio: 'Seeking knowledge and understanding.',
  },
  {
    id: 'user2',
    name: 'Sheikh Omar Abdullah',
    email: 'sheikh.omar@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    userType: UserType.Ulama,
    followersCount: 1250,
    followingCount: 10,
    questionsAsked: [],
    answersProvided: [],
    bio: 'Sharing knowledge from the Quran and Sunnah. Specializes in Fiqh.',
  },
  {
    id: 'user3',
    name: 'Fatima Ahmed',
    email: 'fatima@example.com',
    avatarUrl: 'https://placehold.co/100x100.png',
    userType: UserType.Asker,
    followersCount: 5,
    followingCount: 2,
    questionsAsked: [],
    answersProvided: [],
    bio: 'Student of Islamic studies.',
  },
  {
    id: 'user4',
    name: 'Imam Zaid Shakir',
    email: 'imam.zaid@example.com',
    userType: UserType.Ulama,
    followersCount: 5000,
    followingCount: 3,
    questionsAsked: [],
    answersProvided: [],
    bio: 'Dedicated to authentic Islamic scholarship and community service.',
    avatarUrl: 'https://placehold.co/100x100.png',
  },
];

export const mockResources: Resource[] = [
  {
    id: 'res1',
    type: 'youtube',
    title: 'Understanding Salah - Step by Step Guide',
    url: 'https://www.youtube.com/watch?v=examplevideo1',
  },
  {
    id: 'res2',
    type: 'book',
    title: 'Fiqh Us Sunnah by Sayyid Sabiq',
    url: 'https://archive.org/details/FiqhUsSunnahVolume1BySayyidSabiq',
  },
  {
    id: 'res3',
    type: 'link',
    title: 'IslamicFinder - Prayer Times',
    url: 'https://www.islamicfinder.org',
  }
];

export const mockAnswers: Answer[] = [
  {
    id: 'ans1',
    content: "Salah, or prayer, is one of the Five Pillars of Islam. It is performed five times a day at specific times: Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset), and Isha (night). Each prayer consists of a sequence of movements and recitations. It's crucial to perform wudu (ablution) before praying to ensure purity.",
    authorId: 'user2',
    author: mockUsers[1],
    questionId: 'q1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resources: [mockResources[0], mockResources[1]],
    upvotes: 150,
    downvotes: 2,
  },
  {
    id: 'ans2',
    content: "Zakat is an obligatory charity for Muslims who meet certain wealth criteria. It is calculated as 2.5% of one's savings and wealth above the Nisab (minimum threshold) that has been held for a full lunar year. Zakat purifies wealth and helps those in need.",
    authorId: 'user4',
    author: mockUsers[3],
    questionId: 'q2',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    resources: [mockResources[2]],
    upvotes: 220,
    downvotes: 1,
  },
  {
    id: 'ans3',
    content: "Fasting during Ramadan involves abstaining from food, drink, and sexual activity from dawn (Fajr) until sunset (Maghrib). It is a time for increased worship, reflection, and charity. Certain individuals are exempt, such as the sick, travelers, pregnant or nursing women, and young children.",
    authorId: 'user2',
    author: mockUsers[1],
    questionId: 'q3',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 95,
    downvotes: 0,
  }
];

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    title: 'What are the basics of Salah (prayer) in Islam?',
    content: 'I am new to Islam and would like to understand the fundamental aspects of performing Salah. What are the timings, conditions, and key actions involved?',
    authorId: 'user1',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    answers: [mockAnswers[0]],
    tags: ['salah', 'prayer', 'new muslim'],
    isPopular: true,
  },
  {
    id: 'q2',
    title: 'How is Zakat calculated and distributed?',
    content: 'Could someone explain the calculation of Zakat? Who are the recipients of Zakat, and what types of wealth are subject to it?',
    authorId: 'user3',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    answers: [mockAnswers[1]],
    tags: ['zakat', 'charity', 'fiqh'],
    isPopular: true,
  },
  {
    id: 'q3',
    title: 'What are the rules of fasting during Ramadan?',
    content: 'I plan to fast this Ramadan. What are the things that invalidate the fast, and who is exempt from fasting?',
    authorId: 'user1',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    answers: [mockAnswers[2]],
    tags: ['ramadan', 'fasting', 'sawm'],
    isPopular: true,
  },
  {
    id: 'q4',
    title: 'What is the significance of Hajj?',
    content: 'Can someone explain the importance of Hajj in Islam and the main rituals performed?',
    authorId: 'user3',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    answers: [],
    tags: ['hajj', 'pilgrimage', 'pillars of islam'],
  },
];

// Populate user questions and answers
mockUsers[0].questionsAsked = [mockQuestions[0], mockQuestions[2]];
mockUsers[1].answersProvided = [mockAnswers[0], mockAnswers[2]];
mockUsers[2].questionsAsked = [mockQuestions[1], mockQuestions[3]];
mockUsers[3].answersProvided = [mockAnswers[1]];

export const getQuestionById = (id: string): Question | undefined => mockQuestions.find(q => q.id === id);
export const getUserById = (id: string): User | undefined => mockUsers.find(u => u.id === id);
export const getPopularQuestions = (): Question[] => mockQuestions.filter(q => q.isPopular);
