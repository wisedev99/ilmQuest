
import type { UserType } from '@/lib/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  userType: UserType;
  followersCount: number;
  followingCount: number;
  questionsAsked: Question[];
  answersProvided: Answer[];
  bio?: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  answers: Answer[];
  tags?: string[];
  isPopular?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  authorId: string;
  author: User; // Ulama
  questionId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  resources?: Resource[];
  upvotes: number;
  downvotes: number;
}

export interface Resource {
  id: string;
  type: 'youtube' | 'book' | 'link';
  title: string;
  url: string;
}

export interface Hadith {
  id: string;
  collection: string; // e.g., "Sahih al-Bukhari"
  bookNumber?: number; // Optional: Book number within the collection
  bookName_en?: string; // Optional: English name of the book/chapter
  bookName_tj?: string;
  bookName_ru?: string;
  bookName_fa?: string;
  hadithNumber: string; // Can be like "1", "1.2", "Volume 1, Book 1, Number 1"
  narrator_en?: string;
  narrator_tj?: string;
  narrator_ru?: string;
  narrator_fa?: string;
  text_en: string;
  text_tj: string;
  text_ru: string;
  text_fa: string;
  // Add other relevant fields like chapter, etc. if available
}
