import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import FilmGrain from '@/components/ui/FilmGrain'
import SoundManager from '@/components/SoundManager'
import EasterEgg from '@/components/EasterEgg'
import CookieBanner from '@/components/CookieBanner'
import { ThemeProvider } from '@/components/ThemeContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://quantumpixel.duckdns.org'),
  title: "Quantum Pixels - Where Creativity Meets Engineering",
  description: "We build intelligent digital experiences that merge creativity with cutting-edge engineering.",
  keywords: ['futuristic software startup', 'education technology', 'gaming studio', 'software development company', 'AI-powered digital solutions', 'engineering startup'],
  authors: [{ name: 'Quantum Pixels' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Quantum Pixels — Engineering The Future',
    description: 'Education. Gaming. Software Innovation — Built by the Next Generation.',
    url: 'https://quantumpixels.dev',
    siteName: 'Quantum Pixels',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Quantum Pixels Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Pixels — Engineering The Future',
    description: 'Education. Gaming. Software Innovation — Built by the Next Generation.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider>
          <SoundManager />
          <FilmGrain />
          <EasterEgg />
          <Preloader />
          <CustomCursor />
          <CookieBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
