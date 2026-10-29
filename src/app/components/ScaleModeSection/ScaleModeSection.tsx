'use client';

import { ToggleGroup, ToggleGroupItem } from '@konopskidev/ui';

import { Section } from '@/app/components/Section';
import type { ScaleMode } from '@/app/types';

interface ScaleModeSectionProps {
  scaleMode: ScaleMode;
  onScaleModeChange: (mode: ScaleMode) => void;
}

export function ScaleModeSection({ scaleMode, onScaleModeChange }: ScaleModeSectionProps) {
  return (
    <Section
      title="Scale mode"
      description="How the colors in between are calculated."
      contentClassName="gap-3"
    >
      <ToggleGroup
        aria-label="Scale mode"
        type="single"
        variant="outline"
        spacing={0}
        className="w-full"
        value={scaleMode}
        onValueChange={(value) => value && onScaleModeChange(value as ScaleMode)}
      >
        <ToggleGroupItem value="two-color" className="flex-1">
          Between two colors
        </ToggleGroupItem>
        <ToggleGroupItem value="step" className="flex-1">
          Fixed step
        </ToggleGroupItem>
      </ToggleGroup>
    </Section>
  );
}
