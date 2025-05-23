// src/locales/server.ts
import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    en: () => import('./en'),
    tj: () => import('./tj'),
    ru: () => import('./ru'),
    fa: () => import('./fa'),
  });
