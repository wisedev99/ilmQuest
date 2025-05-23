// src/middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import type { NextRequest } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'tj', 'ru', 'fa'],
  defaultLocale: 'en',
  urlMappingStrategy: 'redirect',
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
