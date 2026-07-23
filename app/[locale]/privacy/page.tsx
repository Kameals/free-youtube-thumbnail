import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return { title: t('title') }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const sections = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'] as const

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href={`/${locale}`}
          className="text-sm text-red-500 hover:underline mb-8 inline-block"
        >
          ← {t('hero.title').replace(' 🚀', '')}
        </Link>
        <h1 className="text-3xl font-extrabold mb-2">{t('privacy.title')}</h1>
        <p className="text-gray-400 text-sm mb-10">{t('privacy.lastUpdated')}</p>
        <p className="text-gray-600 mb-8 leading-relaxed">{t('privacy.intro')}</p>
        {sections.map((s) => (
          <section key={s} className="mb-8">
            <h2 className="text-lg font-bold mb-2">{t(`privacy.${s}t`)}</h2>
            <p className="text-gray-600 leading-relaxed">{t(`privacy.${s}b`)}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
