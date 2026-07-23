import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ko', 'en', 'ja'] as const,
  defaultLocale: 'en',
})

export type Locale = (typeof routing.locales)[number]
