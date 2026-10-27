'use client';

import { InputColorsSection } from '@/app/components/InputColorsSection';
import { ScaleModeSection } from '@/app/components/ScaleModeSection';
import { ScaleSettingsSection } from '@/app/components/ScaleSettingsSection';
import type { ColorSpace, ColorTypeMap, ScaleMode } from '@/app/types';

interface ColorScaleFormProps {
  scaleMode: ScaleMode;
  onScaleModeChange: (mode: ScaleMode) => void;
  colorsNumber: number;
  onColorsNumberChange: (count: number) => void;
  inputColorSpace: ColorSpace;
  onInputColorSpaceChange: (colorSpace: ColorSpace) => void;
  previewColorSpace: ColorSpace;
  onPreviewColorSpaceChange: (colorSpace: ColorSpace) => void;
  resultsColorSpace: ColorSpace;
  onResultsColorSpaceChange: (colorSpace: ColorSpace) => void;
  inputColorStart: ColorTypeMap[ColorSpace];
  onInputColorStartChange: (color: ColorTypeMap[ColorSpace]) => void;
  inputColorEnd: ColorTypeMap[ColorSpace];
  onInputColorEndChange: (color: ColorTypeMap[ColorSpace]) => void;
  hexInputColorStart: { hex: string };
  hexInputColorEnd: { hex: string };
  onHexInputColorStartChange: (hex: string) => void;
  onHexInputColorEndChange: (hex: string) => void;
  step: Partial<Record<string, number>>;
  onStepChange: (step: Partial<Record<string, number>>) => void;
}

export function ColorScaleForm({
  scaleMode,
  onScaleModeChange,
  colorsNumber,
  onColorsNumberChange,
  inputColorSpace,
  onInputColorSpaceChange,
  previewColorSpace,
  onPreviewColorSpaceChange,
  resultsColorSpace,
  onResultsColorSpaceChange,
  inputColorStart,
  onInputColorStartChange,
  inputColorEnd,
  onInputColorEndChange,
  hexInputColorStart,
  hexInputColorEnd,
  onHexInputColorStartChange,
  onHexInputColorEndChange,
  step,
  onStepChange,
}: ColorScaleFormProps) {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-4">
      <ScaleModeSection scaleMode={scaleMode} onScaleModeChange={onScaleModeChange} />
      <InputColorsSection
        isTwoColor={scaleMode === 'two-color'}
        inputColorSpace={inputColorSpace}
        onInputColorSpaceChange={onInputColorSpaceChange}
        previewColorSpace={previewColorSpace}
        onPreviewColorSpaceChange={onPreviewColorSpaceChange}
        inputColorStart={inputColorStart}
        onInputColorStartChange={onInputColorStartChange}
        inputColorEnd={inputColorEnd}
        onInputColorEndChange={onInputColorEndChange}
        hexInputColorStart={hexInputColorStart}
        hexInputColorEnd={hexInputColorEnd}
        onHexInputColorStartChange={onHexInputColorStartChange}
        onHexInputColorEndChange={onHexInputColorEndChange}
      />
      <ScaleSettingsSection
        scaleMode={scaleMode}
        colorsNumber={colorsNumber}
        onColorsNumberChange={onColorsNumberChange}
        resultsColorSpace={resultsColorSpace}
        onResultsColorSpaceChange={onResultsColorSpaceChange}
        step={step}
        onStepChange={onStepChange}
      />
    </form>
  );
}
