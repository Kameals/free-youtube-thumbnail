import { ImageResponse } from 'next/og'
import { routing, type Locale } from '@/i18n/routing'

export const alt = 'YouTube Thumbnail Downloader'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const COPY: Record<Locale, { title: string; sub: string }> = {
  en: {
    title: 'YouTube Thumbnail\nDownloader',
    sub: 'Download any thumbnail for free — instantly.',
  },
  ko: {
    title: '유튜브 썸네일\n다운로드',
    sub: '무료로 즉시 다운로드하세요.',
  },
  ja: {
    title: 'YouTubeサムネイル\nダウンロード',
    sub: 'サムネイルを無料ですぐにダウンロード。',
  },
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const l: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : 'en'
  const { title, sub } = COPY[l]

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#0f0f0f',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Left red accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 10,
            height: '100%',
            background: '#ff0000',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 64,
            padding: '0 80px 0 90px',
            width: '100%',
          }}
        >
          {/* Play button icon — SVG triangle (CSS border trick doesn't work in Satori) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 176,
              height: 176,
              borderRadius: 40,
              background: '#ff0000',
              flexShrink: 0,
              boxShadow: '0 0 60px rgba(255,0,0,0.4)',
            }}
          >
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="white"
            >
              <polygon points="20,12 64,36 20,60" />
            </svg>
          </div>

          {/* Text block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.15,
                whiteSpace: 'pre-line',
                letterSpacing: '-1px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#888888',
                lineHeight: 1.4,
              }}
            >
              {sub}
            </div>
            <div
              style={{
                fontSize: 22,
                color: '#ff4444',
                marginTop: 4,
                letterSpacing: '0.5px',
              }}
            >
              free-youtube-thumbnail.com
            </div>
          </div>
        </div>

        {/* Bottom divider line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #ff0000 0%, transparent 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
