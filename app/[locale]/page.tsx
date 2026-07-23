'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import Link from 'next/link'


const THUMBNAIL_KEYS = [
  { key: 'maxresdefault', name: 'maxresdefault.jpg', w: 1920, h: 1080 },
  { key: 'sddefault',     name: 'sddefault.jpg',     w: 640,  h: 480  },
  { key: 'hqdefault',     name: 'hqdefault.jpg',     w: 480,  h: 360  },
  { key: 'zero',          name: '0.jpg',             w: 480,  h: 360  },
  { key: 'mqdefault',     name: 'mqdefault.jpg',     w: 320,  h: 180  },
  { key: 'default',       name: 'default.jpg',       w: 120,  h: 90   },
  { key: 'one',           name: '1.jpg',             w: 120,  h: 90   },
  { key: 'two',           name: '2.jpg',             w: 120,  h: 90   },
  { key: 'three',         name: '3.jpg',             w: 120,  h: 90   },
] as const

const VIDEO_ID_PATTERNS = [
  /[?&]v=([a-zA-Z0-9_-]{11})/,
  /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
]

function extractVideoId(url: string): string | null {
  for (const pattern of VIDEO_ID_PATTERNS) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
}

export default function Page() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  )
}

function HomePage() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const initialId = searchParams.get('v')
  const [url, setUrl] = useState(initialId ? `https://youtu.be/${initialId}` : '')
  const [videoId, setVideoId] = useState<string | null>(initialId)
  const [error, setError] = useState(false)

  // URL의 ?v= 파라미터와 state 동기화 (없으면 초기화)
  useEffect(() => {
    const id = searchParams.get('v')
    if (id) {
      if (id !== videoId) {
        setVideoId(id)
        setUrl(`https://youtu.be/${id}`)
      }
    } else {
      setVideoId(null)
      setUrl('')
      setError(false)
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    const id = extractVideoId(url.trim())
    if (!id) {
      setError(true)
      inputRef.current?.focus()
      return
    }
    setError(false)
    setVideoId(id)
    router.replace(`${pathname}?v=${id}`, { scroll: false })
  }

  const handleChange = (v: string) => {
    setUrl(v)
    if (error) setError(false)
    const id = extractVideoId(v.trim())
    if (id) {
      setError(false)
      setVideoId(id)
      router.replace(`${pathname}?v=${id}`, { scroll: false })
    }
  }

  const switchLocale = (next: Locale) => {
    const segments = pathname.split('/')
    segments[1] = next
    const newPath = segments.join('/')
    router.push(videoId ? `${newPath}?v=${videoId}` : newPath)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="font-semibold text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            🚀 {t('hero.title')}
          </Link>
          <nav className="flex gap-1" aria-label="Language">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  l === locale
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4">

        {/* ── Hero ── */}
        <section className="pt-16 pb-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            {t('hero.title')}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">{t('hero.subtitle')}</p>
        </section>

        {/* ── Input ── */}
        <section className="mb-10">
          <div className={`flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl border-2 transition-colors ${
            error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-200 bg-gray-50 focus-within:border-slate-400 focus-within:bg-white'
          }`}>
            <input
              ref={inputRef}
              type="url"
              inputMode="url"
              autoComplete="off"
              value={url}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={t('input.placeholder')}
              aria-label={t('input.placeholder')}
              aria-invalid={error}
              className="flex-1 px-4 py-3 bg-transparent text-[16px] placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white font-bold rounded-xl transition-colors text-[16px] cursor-pointer"
            >
              {t('input.button')}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-400 text-center">
              {t('alerts.invalid')}
            </p>
          )}
        </section>

        {/* ── Results ── */}
        {videoId && (
          <section className="pb-16 space-y-3">

            {THUMBNAIL_KEYS.map(({ key, name, w, h }) => {
              const imgUrl = `https://img.youtube.com/vi/${videoId}/${name}`
              const label = t(`thumbnails.${key}`)

              return (
                <article
                  key={key}
                  className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm"
                >
                  <div className="bg-gray-50 flex items-start p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={label}
                      width={w}
                      height={h}
                      loading="lazy"
                      decoding="async"
                      style={{ width: w, height: 'auto' }}
                      className="max-w-full block"
                    />
                  </div>
                  <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-500 tabular-nums">
                      {w} × {h}
                    </span>
                    <a
                      href={imgUrl}
                      download={`${videoId}-${name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 min-h-[32px] px-3 py-1.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      ↓ {t('download')}
                    </a>
                  </div>
                </article>
              )
            })}
          </section>
        )}

        {!videoId && <div className="pb-24" aria-hidden="true" />}
      </main>

      <footer className="border-t border-gray-100 py-5 text-center text-xs text-gray-300 space-y-1">
        <p>{t('footer')}</p>
        <p>
          <Link href={`/${locale}/privacy`} className="hover:text-gray-500 underline underline-offset-2">
            {t('privacyLink')}
          </Link>
        </p>
      </footer>
    </div>
  )
}