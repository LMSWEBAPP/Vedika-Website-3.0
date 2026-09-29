import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';
import { ModelTunerProvider } from '@/hooks/useModelTuner';
import { AtmosphericBackground } from '@/components/background/AtmosphericBackground';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VEDIKA — Your Personal AI Tutor',
  description:
    'Vedika brings intelligent guidance, personalized explanations, and a more natural learning experience into one place.',
  keywords: [
    'AI Tutor',
    'Vedika',
    'Personalized Learning',
    'Intelligent Education',
    'Adaptive Learning',
    'Future of Education',
  ],
  authors: [{ name: 'Vedika AI' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#081017',
};

import { InteractionProvider } from '@/hooks/useInteraction';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body className={manrope.className} suppressHydrationWarning>
        <ThemeProvider>
          <ModelTunerProvider>
            <InteractionProvider>
              {/* Multi-layered cinematic atmosphere (gradients, glow, noise, vignette, particles) */}
              <AtmosphericBackground />
              {children}
            </InteractionProvider>
          </ModelTunerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
