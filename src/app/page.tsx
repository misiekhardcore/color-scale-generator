'use client';

import { useState } from 'react';

import { Converter, Scaler } from '@/lib/services';
import {
  Button,
  ClickableColorOutput,
  ColorInput,
  ColorOutput,
  ExportModal,
  Input,
  Selector,
  StepInputs,
} from '@/app/components';

import { ColorSpace, ColorTypeMap } from './types';
import { COLOR_SPACES } from './constants';

const INITIAL_RESULTS_COUNT = 10;
const MAX_RESULTS_COUNT = 100;
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
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 justify-center">
        <div className="grid grid-cols-3 gap-2 items-start">
          <Button onClick={() => setIsExportModalOpen(true)} className="self-end">
            Export scale
          </Button>
          <Selector
            label="Scale mode"
            items={['two-color', 'step'] as const}
            selected={scaleMode}
            onChange={(value) => setScaleMode(value)}
          />
          <div></div>
          <Input
            label="Color"
            type="color"
            value={hexInputColorStart.hex}
            onChange={handleColorInputStartChange}
          />
          {scaleMode === 'two-color' && (
            <Input
              label="Color"
              type="color"
              value={hexInputColorEnd.hex}
              onChange={handleColorInputEndChange}
            />
          )}
          {scaleMode === 'step' && <div></div>}
          <Selector
            label="Input color space"
            items={COLOR_SPACES}
            selected={inputColorSpace}
            onChange={changeInputColorSpace}
          />
          <ColorInput
            type={inputColorSpace}
            value={inputColorStart}
            onChange={(newValue) => setInputColorStart(newValue)}
          />
          {scaleMode === 'two-color' && (
            <ColorInput
              type={inputColorSpace}
              value={inputColorEnd}
              onChange={(newValue) => setInputColorEnd(newValue)}
            />
          )}
          {scaleMode === 'step' && <div></div>}
          <Selector
            label="Output color space"
            items={COLOR_SPACES}
            selected={outputColorSpace}
            onChange={changeOutputColorSpace}
          />
          <ColorOutput
            value={inputColorStart}
            from={inputColorSpace}
            to={outputColorSpace}
            className="self-end"
          />
          {scaleMode === 'two-color' && (
            <ColorOutput
              value={inputColorEnd}
              from={inputColorSpace}
              to={outputColorSpace}
              className="self-end"
            />
          )}
          {scaleMode === 'step' && <div></div>}
          <Input
            className="col-span-3"
            value={colorsNumber.toString()}
            onChange={(value) => setColorsNumber(parseInt(value))}
            label="Colors in scale"
            min={1}
            max={MAX_RESULTS_COUNT}
            type="number"
          />
          {scaleMode === 'step' && (
            <div className="col-span-3 grid grid-cols-4 gap-2">
              <div className="col-span-4 font-semibold">
                Step values (in {resultsColorSpace} space):
              </div>
              <StepInputs colorSpace={resultsColorSpace} step={step} onStepChange={setStep} />
            </div>
          )}
        </div>
      </form>
      <div className="flex gap-2 flex-wrap w-full items-center">
        <Selector
          label="Color scale calculation space"
          items={COLOR_SPACES}
          selected={resultsColorSpace}
          onChange={changeResultsColorSpace}
        />
        <div className="flex gap-2 flex-wrap w-full items-center">
          {scale.map((color, index) => (
            <ClickableColorOutput key={index} value={color} type={resultsColorSpace} />
          ))}
        </div>
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
