import { PaletteIcon } from 'lucide-react';

import { ThemeToggle } from '@/app/components/ThemeToggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <PaletteIcon className="size-4.5" />
          </span>
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-sm font-semibold">Color Scale Generator</h1>
            <p className="truncate text-xs text-muted-foreground">
              Build a ramp between two colors, or step from a single one
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
