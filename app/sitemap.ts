import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export const dynamic = 'force-static'

const BASE_URL = 'https://free-youtube-thumbnail.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
  }))
}
