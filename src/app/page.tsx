'use client';

import { useState } from 'react';

import { Scaler } from '@/lib/services';
import { ColorScaleForm, ExportModal, ScaleResults } from '@/app/components';
import { useColorInputs, useStepValues } from '@/app/hooks';

import { ColorSpace } from './types';

const INITIAL_RESULTS_COUNT = 10;
const INITIAL_OUTPUT_COLOR_SPACE: ColorSpace = 'RAL';

type ScaleMode = 'two-color' | 'step';

export default function Home() {
  const [scaleMode, setScaleMode] = useState<ScaleMode>('two-color');
  const [colorsNumber, setColorsNumber] = useState(INITIAL_RESULTS_COUNT);
  const [outputColorSpace, setOutputColorSpace] = useState<ColorSpace>(INITIAL_OUTPUT_COLOR_SPACE);
  const [resultsColorSpace, setResultsColorSpace] = useState<ColorSpace>(
    INITIAL_OUTPUT_COLOR_SPACE
  );
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

  function changeOutputColorSpace(newColorSpace: ColorSpace) {
    setOutputColorSpace(newColorSpace);
  }

  function changeResultsColorSpace(newColorSpace: ColorSpace) {
    setResultsColorSpace(newColorSpace);
    resetStepForColorSpace(newColorSpace);
  }

  return (
    <main className="flex flex-col gap-2 p-2 max-w-(--breakpoint-xl)">
      <ColorScaleForm
        scaleMode={scaleMode}
        onScaleModeChange={setScaleMode}
        colorsNumber={colorsNumber}
        onColorsNumberChange={setColorsNumber}
        inputColorSpace={inputColorSpace}
        onInputColorSpaceChange={changeInputColorSpace}
        outputColorSpace={outputColorSpace}
        onOutputColorSpaceChange={changeOutputColorSpace}
        resultsColorSpace={resultsColorSpace}
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
        onExportClick={() => setIsExportModalOpen(true)}
      />
      <ScaleResults
        scale={scale}
        colorSpace={resultsColorSpace}
        onColorSpaceChange={changeResultsColorSpace}
      />
      <ExportModal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        from={resultsColorSpace}
        scale={scale}
      />
    </main>
  );
}
