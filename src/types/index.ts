
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
