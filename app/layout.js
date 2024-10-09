import './styles/globals.css';  // Make sure this path is correct
import { ThemeProvider } from 'next-themes';
import { Play, Inter, Space_Mono } from 'next/font/google';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const play = Play({
  subsets: ['latin'],
  variable: '--font-play',
  weight: ['400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
});

export const metadata = {
  title: 'ignas_app',
  description: 'welcome to my digital playground',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.xeiaso.net/static/css/iosevka/family.css" />
      </head>
      <body className={`${play.variable} ${inter.variable} ${spaceMono.variable} font-inter`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
