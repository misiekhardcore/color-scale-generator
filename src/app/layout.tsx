import { TooltipProvider } from '@konopskidev/ui';
import type { Metadata } from 'next';
import { JetBrains_Mono, Lato, Lora, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';

import { AppHeader } from '@/app/components/AppHeader';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { Toaster } from '@/app/components/Toaster';
import { cn } from '@/lib/utils';

import './index.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Color Scale Generator',
  description: 'Generate color scales easily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'font-sans',
        lato.variable,
        playfairDisplay.variable,
        lora.variable,
        jetBrainsMono.variable
      )}
    >
      <body className="min-h-svh bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <div className="flex min-h-svh flex-col">
              <AppHeader />
              {children}
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
