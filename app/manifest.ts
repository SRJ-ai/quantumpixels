import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quantum Pixels',
    short_name: 'QP',
    description: 'Intelligent digital experiences merging creativity with cutting-edge engineering.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05080f',
    theme_color: '#00FFB2',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
