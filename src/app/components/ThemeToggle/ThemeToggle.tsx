'use client';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'system', label: 'System', Icon: MonitorIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      aria-label="Color theme"
      type="single"
      variant="outline"
      size="sm"
      spacing={0}
      value={theme}
      onValueChange={(value) => value && setTheme(value)}
    >
      {THEME_OPTIONS.map(({ value, label, Icon }) => (
        <Tooltip key={value}>
          <TooltipTrigger asChild>
            <ToggleGroupItem value={value} aria-label={label} suppressHydrationWarning>
              <Icon />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  );
}
