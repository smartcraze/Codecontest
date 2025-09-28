import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Navbar01 } from '@/components/nav-bar'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Contest for Developer - Competitive Programming Platform',
    template: '%s | Contest for Developer',
  },
  description:
    'Join live coding competitions, challenge yourself with programming problems, and climb the global leaderboard. Compete with developers worldwide in real-time contests and improve your coding skills.',
  keywords: [
    'coding contests',
    'competitive programming',
    'programming challenges',
    'coding competitions',
    'developer contests',
    'algorithm challenges',
    'programming practice',
    'coding skills',
    'leaderboard',
    'live contests',
    'coding platform',
    'software development',
    'programming problems',
    'code challenges',
    'developer community',
  ],
  authors: [{ name: 'Contest for Developer Team' }],
  creator: 'Contest for Developer',
  publisher: 'Contest for Developer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://contestfordeveloper.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://contestfordeveloper.com',
    title: 'Contest for Developer - Competitive Programming Platform',
    description:
      'Join live coding competitions, challenge yourself with programming problems, and climb the global leaderboard. Compete with developers worldwide in real-time contests.',
    siteName: 'Contest for Developer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contest for Developer - Competitive Programming Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contest for Developer - Competitive Programming Platform',
    description:
      'Join live coding competitions, challenge yourself with programming problems, and climb the global leaderboard.',
    images: ['/og-image.png'],
    creator: '@contestfordev',
    site: '@contestfordev',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3b82f6',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  classification: 'Education & Technology',
  other: {
    'application-name': 'Contest for Developer',
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#ffffff',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Navbar01 />
            {children}
          </main>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
