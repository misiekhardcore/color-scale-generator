'use client';

import { Input, Label, Slider } from '@konopskidev/ui';
import { useId } from 'react';

import { Section } from '@/app/components/Section';
import { Selector } from '@/app/components/Selector';
import { StepInputs } from '@/app/components/StepInputs';
import { COLOR_SPACES, MAX_RESULTS_COUNT, MIN_RESULTS_COUNT } from '@/app/constants';
import type { ColorSpace, ScaleMode } from '@/app/types';

interface ScaleSettingsSectionProps {
  scaleMode: ScaleMode;
  colorsNumber: number;
  onColorsNumberChange: (count: number) => void;
  resultsColorSpace: ColorSpace;
  onResultsColorSpaceChange: (colorSpace: ColorSpace) => void;
  step: Partial<Record<string, number>>;
  onStepChange: (step: Partial<Record<string, number>>) => void;
}

export function ScaleSettingsSection({
  scaleMode,
  colorsNumber,
  onColorsNumberChange,
  resultsColorSpace,
  onResultsColorSpaceChange,
  step,
  onStepChange,
}: ScaleSettingsSectionProps) {
  const colorsNumberId = useId();

  function handleColorsNumberChange(value: string) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return;
    }
    onColorsNumberChange(Math.min(Math.max(parsed, MIN_RESULTS_COUNT), MAX_RESULTS_COUNT));
  }

  return (
    <Section
      title="Scale settings"
      description="How many colors to generate and how they are interpolated."
      contentClassName="gap-4"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={colorsNumberId}>Colors in scale</Label>
          <Input
            id={colorsNumberId}
            type="number"
            min={MIN_RESULTS_COUNT}
            max={MAX_RESULTS_COUNT}
            step={1}
            className="w-20 text-center"
            value={colorsNumber}
            onChange={(event) => handleColorsNumberChange(event.target.value)}
          />
        </div>
        <Slider
          thumbLabels={['Number of colors']}
          min={MIN_RESULTS_COUNT}
          max={MAX_RESULTS_COUNT}
          step={1}
          value={[colorsNumber]}
          onValueChange={([next]) => next !== undefined && onColorsNumberChange(next)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Selector
          label="Interpolate in"
          items={COLOR_SPACES}
          selected={resultsColorSpace}
          onChange={onResultsColorSpaceChange}
        />
        <p className="text-xs text-muted-foreground">
          The color space used to calculate every color between the start and end.
        </p>
      </div>

      {scaleMode === 'step' ? (
        <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Step values</span>
            <span className="text-xs text-muted-foreground">
              Added to each channel of the start color in the {resultsColorSpace} space.
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] gap-2">
            <StepInputs colorSpace={resultsColorSpace} step={step} onStepChange={onStepChange} />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
