'use client';

import { useState } from 'react';

import { Converter, Scaler } from '@/lib/services';
import { ColorScaleForm, ExportModal, ScaleResults } from '@/app/components';

import { ColorSpace, ColorTypeMap } from './types';

const INITIAL_RESULTS_COUNT = 10;
const INITIAL_INPUT_COLOR_SPACE: keyof ColorTypeMap = 'RGB';
const INITIAL_OUTPUT_COLOR_SPACE: keyof ColorTypeMap = 'RAL';

const INITIAL_COLOR_START: ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE] = {
  r: 255,
  g: 0,
  b: 0,
};
const INITIAL_COLOR_END: ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE] = {
  r: 0,
  g: 255,
  b: 0,
};

type ScaleMode = 'two-color' | 'step';

export default function Home() {
  const [scaleMode, setScaleMode] = useState<ScaleMode>('two-color');
  const [colorsNumber, setColorsNumber] = useState(INITIAL_RESULTS_COUNT);
  const [inputColorSpace, setInputColorSpace] = useState<ColorSpace>(INITIAL_INPUT_COLOR_SPACE);
  const [outputColorSpace, setOutputColorSpace] = useState<ColorSpace>(INITIAL_OUTPUT_COLOR_SPACE);
  const [resultsColorSpace, setResultsColorSpace] = useState<ColorSpace>(
    INITIAL_OUTPUT_COLOR_SPACE
  );
  const [inputColorStart, setInputColorStart] =
    useState<ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE]>(INITIAL_COLOR_START);
  const [inputColorEnd, setInputColorEnd] =
    useState<ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE]>(INITIAL_COLOR_END);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Step state - dynamically based on results color space
  const [step, setStep] = useState<Partial<Record<string, number>>>({ r: 10, g: 10, b: 10 });

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

  const hexInputColorStart = Converter.convert(inputColorSpace, 'HEX', inputColorStart);
  const hexInputColorEnd = Converter.convert(inputColorSpace, 'HEX', inputColorEnd);

  function changeInputColorSpace(newColorSpace: ColorSpace) {
    const converter = Converter.getConverter(inputColorSpace, newColorSpace);
    setInputColorStart(converter(inputColorStart));
    setInputColorEnd(converter(inputColorEnd));
    setInputColorSpace(newColorSpace);
  }

  function changeOutputColorSpace(newColorSpace: ColorSpace) {
    setOutputColorSpace(newColorSpace);
  }

  function changeResultsColorSpace(newColorSpace: ColorSpace) {
    setResultsColorSpace(newColorSpace);
    // Reset step values based on new color space
    if (newColorSpace === 'RGB' || newColorSpace === 'HEX' || newColorSpace === 'RAL') {
      setStep({ r: 10, g: 10, b: 10 });
    } else if (newColorSpace === 'CMYK') {
      setStep({ c: 1, m: 1, y: 1, k: 1 });
    } else if (newColorSpace === 'HSL') {
      setStep({ h: 10, s: 5, l: 5 });
    } else if (newColorSpace === 'HSV') {
      setStep({ h: 10, s: 5, v: 5 });
    } else if (newColorSpace === 'HWB') {
      setStep({ h: 10, w: 5, b: 5 });
    }
  }

  function handleColorInputStartChange(newValue: string) {
    const convertedColor = Converter.convert('HEX', inputColorSpace, { hex: newValue });
    setInputColorStart(convertedColor);
  }

  function handleColorInputEndChange(newValue: string) {
    const convertedColor = Converter.convert('HEX', inputColorSpace, { hex: newValue });
    setInputColorEnd(convertedColor);
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
