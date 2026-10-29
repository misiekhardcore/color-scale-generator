'use client';

import { Toaster as DesignSystemToaster } from '@konopskidev/ui/components/sonner';
import { useTheme } from 'next-themes';

type Theme = 'light' | 'dark' | 'system';

export function Toaster() {
  const { theme = 'system' } = useTheme();

  return <DesignSystemToaster theme={theme as Theme} />;
}
