import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Prompt | Free AI Prompt Engineer',
  description: 'The professional AI prompt builder optimized for text, images, and videos.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* SVG Favicon representing the Brain Logo */}
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 5.886 3 3 0 1 0 5.174 2.688 3 3 0 1 0 5.658 0 3 3 0 1 0 5.174-2.688 4 4 0 0 0 .52-5.886 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z'%3E%3C/path%3E%3Cpath d='M9 13a4.5 4.5 0 0 0 3-4'%3E%3C/path%3E%3Cpath d='M15 13a4.5 4.5 0 0 1-3-4'%3E%3C/path%3E%3Cpath d='M12 13V8'%3E%3C/path%3E%3C/svg%3E" />
      </head>
      <body className="font-body antialiased bg-white text-slate-900 selection:bg-sky-100">
        {children}
      </body>
    </html>
  );
}
