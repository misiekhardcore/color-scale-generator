'use client';

import { useState } from 'react';

import { ColorScaleForm } from '@/app/components/ColorScaleForm';
import { ExportModal } from '@/app/components/ExportModal';
import { ScaleResults } from '@/app/components/ScaleResults';
import { useColorInputs, useStepValues } from '@/app/hooks';
import { Scaler } from '@/lib/services';

import type { ColorSpace, ScaleMode } from './types';

const INITIAL_RESULTS_COUNT = 10;
const INITIAL_COLOR_SPACE: ColorSpace = 'RAL';

export default function Home() {
  const [scaleMode, setScaleMode] = useState<ScaleMode>('two-color');
  const [colorsNumber, setColorsNumber] = useState(INITIAL_RESULTS_COUNT);
  const [previewColorSpace, setPreviewColorSpace] = useState<ColorSpace>(INITIAL_COLOR_SPACE);
  const [resultsColorSpace, setResultsColorSpace] = useState<ColorSpace>(INITIAL_COLOR_SPACE);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const {
    inputColorSpace,
    inputColorStart,
    inputColorEnd,
    hexInputColorStart,
    hexInputColorEnd,
    changeInputColorSpace,
    setInputColorStart,
    setInputColorEnd,
    handleColorInputStartChange,
    handleColorInputEndChange,
  } = useColorInputs();

  const { step, setStep, resetStepForColorSpace } = useStepValues();

  const scale =
    scaleMode === 'two-color'
      ? Scaler.getScale(
          inputColorSpace,
          resultsColorSpace,
          inputColorStart,
          inputColorEnd,
          colorsNumber
        )
      : Scaler.getScaleFromStep(
          inputColorSpace,
          resultsColorSpace,
          inputColorStart,
          step,
          colorsNumber
        );

  function changeResultsColorSpace(newColorSpace: ColorSpace) {
    setResultsColorSpace(newColorSpace);
    resetStepForColorSpace(newColorSpace);
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
        <ColorScaleForm
          scaleMode={scaleMode}
          onScaleModeChange={setScaleMode}
          colorsNumber={colorsNumber}
          onColorsNumberChange={setColorsNumber}
          inputColorSpace={inputColorSpace}
          onInputColorSpaceChange={changeInputColorSpace}
          previewColorSpace={previewColorSpace}
          onPreviewColorSpaceChange={setPreviewColorSpace}
          resultsColorSpace={resultsColorSpace}
          onResultsColorSpaceChange={changeResultsColorSpace}
          inputColorStart={inputColorStart}
          onInputColorStartChange={setInputColorStart}
          inputColorEnd={inputColorEnd}
          onInputColorEndChange={setInputColorEnd}
          hexInputColorStart={hexInputColorStart}
          hexInputColorEnd={hexInputColorEnd}
          onHexInputColorStartChange={handleColorInputStartChange}
          onHexInputColorEndChange={handleColorInputEndChange}
          step={step}
          onStepChange={setStep}
        />
        <ScaleResults
          scale={scale}
          colorSpace={resultsColorSpace}
          onExportClick={() => setIsExportModalOpen(true)}
        />
      </div>
      <ExportModal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        from={resultsColorSpace}
        scale={scale}
      />
    </main>
  );
}
