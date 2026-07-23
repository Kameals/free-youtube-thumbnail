import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    // TypeScript 7 changed its compiler API. Run `npm run typecheck` separately.
    ignoreBuildErrors: true,
  },
}

export default withNextIntl(nextConfig)

