import type { Metadata } from 'next';
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
  
  metadataBase: new URL('https://www.chardhama.com'),
  
  verification: {
    google: 'uq4OvOWYu8KTvby9u_C8Bg0bWB-YWA30Zr4mT1mB7jY',
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
    description: 'Create optimized AI prompts for text, image, and video generation using Smart Prompt.',
    url: 'https://www.chardhama.com',           // ← Fix this
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
    description: 'Generate high-quality AI prompts for text, images, and videos easily with Smart Prompt.',
  },
};

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
      </head>

      <meta name="google-site-verification" content="uq4OvOWYu8KTvby9u_C8Bg0bWB-YWA30Zr4mT1mB7jY" />
      
      <body className="font-body antialiased bg-white text-slate-900 selection:bg-sky-100">
        {children}
      </body>
    </html>
  );
}
