import './styles/globals.css';  // Make sure this path is correct
import { ThemeProvider } from 'next-themes';
import { Play, Inter, Space_Mono } from 'next/font/google';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BackgroundContainer } from './Ui/Background';

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
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${play.variable} ${inter.variable} ${spaceMono.variable} font-inter`}>
        <ThemeProvider attribute="class" enableSystem>
          <BackgroundContainer contentType="media">
            <div className="flex flex-col min-h-screen antialiased selection:bg-neutral-500/90 selection:text-white">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </BackgroundContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
