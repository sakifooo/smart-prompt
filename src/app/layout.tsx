import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Prompt | Free AI Prompt Engineer',
  description: 'The professional AI prompt builder optimized for text, images, and videos.',

  keywords: [
    'Smart Prompt',
    'AI prompt generator',
    'prompt engineer',
    'ChatGPT prompts',
    'AI tools',
    'text to prompt',
    'image prompt generator',
    'video prompt AI',
    'prompt builder',
    'free AI prompt tool',
  ],

  metadataBase: new URL('https://ourspase.com'),

  verification: {
    google: '2Zhv7aVnqJC6yceL8HJy8eqcDWqIo20cIYvF5FboUX0',
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Smart Prompt | AI Prompt Generator',
    description:
      'Create optimized AI prompts for text, image, and video generation using Smart Prompt.',
    url: 'https://ourspase.com/',
    siteName: 'Smart Prompt',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Prompt AI',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Smart Prompt | AI Prompt Generator',
    description:
      'Generate high-quality AI prompts for text, images, and videos easily with Smart Prompt.',
  },
}; // 🔴 هادي كانت ناقصة عندك

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 5.886 3 3 0 1 0 5.174 2.688 3 3 0 1 0 5.658 0 3 3 0 1 0 5.174-2.688 4 4 0 0 0 .52-5.886 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z'%3E%3C/path%3E%3Cpath d='M9 13a4.5 4.5 0 0 0 3-4'%3E%3C/path%3E%3Cpath d='M15 13a4.5 4.5 0 0 1-3-4'%3E%3C/path%3E%3Cpath d='M12 13V8'%3E%3C/path%3E%3C/svg%3E"
        />
      </head>
<meta name="google-site-verification" content="2Zhv7aVnqJC6yceL8HJy8eqcDWqIo20cIYvF5FboUX0" />
      <body className="font-body antialiased bg-white text-slate-900 selection:bg-sky-100">
        {children}
      </body>
    </html>
  );
}
