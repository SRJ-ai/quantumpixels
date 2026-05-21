import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import FilmGrain from '@/components/ui/FilmGrain'
import SoundManager from '@/components/SoundManager'
import EasterEgg from '@/components/EasterEgg'
import { ThemeProvider } from '@/components/ThemeContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Quantum Pixels — Engineering The Future of Digital Experiences',
  description: 'Quantum Pixels is a premium futuristic student-founded technology startup building AI-powered education platforms, immersive games, and scalable software solutions.',
  keywords: ['futuristic software startup', 'education technology', 'gaming studio', 'software development company', 'AI-powered digital solutions', 'engineering startup'],
  authors: [{ name: 'Quantum Pixels' }],
  openGraph: {
    title: 'Quantum Pixels — Engineering The Future',
    description: 'Education. Gaming. Software Innovation — Built by the Next Generation.',
    url: 'https://quantumpixels.dev',
    siteName: 'Quantum Pixels',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Pixels — Engineering The Future',
    description: 'Education. Gaming. Software Innovation — Built by the Next Generation.',
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
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider>
          <SoundManager />
          <FilmGrain />
          <EasterEgg />
          <Preloader />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
