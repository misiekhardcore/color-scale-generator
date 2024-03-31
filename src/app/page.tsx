'use client';

import { useState } from 'react';

import { Converter } from '@/lib/services';
import { ClickableColorOutput, ColorInput, ColorOutput, Input, Selector } from '@/app/components';

import { ColorSpace, ColorTypeMap } from './types';
import { COLOR_SPACES } from './constants';

const INITIAL_RESULTS_COUNT = 10;
const MAX_RESULTS_COUNT = 100;
const INITIAL_INPUT_COLOR_SPACE: keyof ColorTypeMap = 'HEX';
const INITIAL_OUTPUT_COLOR_SPACE: keyof ColorTypeMap = 'RGB';

const INITIAL_COLOR_START: ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE] = {
  hex: '#000000',
};
const INITIAL_COLOR_END: ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE] = {
  hex: '#FFFFFF',
};

export default function Home() {
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
  const scale = getRgbScale(inputColorSpace, inputColorStart, inputColorEnd, colorsNumber);
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
    <main className="flex flex-col gap-2 p-2 max-w-screen-xl">
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 justify-center">
        <div className="grid grid-cols-3 gap-2 items-start">
          <div />
          <Input
            label="Color"
            type="color"
            value={hexInputColorStart.hex}
            onChange={handleColorInputStartChange}
          />
          <Input
            label="Color"
            type="color"
            value={hexInputColorEnd.hex}
            onChange={handleColorInputEndChange}
          />
          <Selector
            label="Input color space"
            items={COLOR_SPACES}
            selected={inputColorSpace}
            onChange={changeInputColorSpace}
          />
          <ColorInput
            value={inputColorStart}
            onChange={(newValue) => setInputColorStart(newValue)}
          />
          <ColorInput value={inputColorEnd} onChange={(newValue) => setInputColorEnd(newValue)} />
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
          <ColorOutput
            value={inputColorEnd}
            from={inputColorSpace}
            to={outputColorSpace}
            className="self-end"
          />
          <Input
            className="col-span-3"
            value={colorsNumber.toString()}
            onChange={(value) => setColorsNumber(parseInt(value))}
            label="How many results"
            min={1}
            max={MAX_RESULTS_COUNT}
            type="number"
          />
        </div>
      </form>
      <div className="flex gap-2 flex-wrap w-full items-center">
        <Selector
          label="Results color space"
          items={COLOR_SPACES}
          selected={resultsColorSpace}
          onChange={changeResultsColorSpace}
        />
        <div className="flex gap-2 flex-wrap w-full items-center">
          {scale.map((color, index) => (
            <ClickableColorOutput key={index} value={color} from="RGB" to={resultsColorSpace} />
          ))}
        </div>
      </div>
    </main>
  );
}

function getRgbScale<T extends keyof ColorTypeMap>(
  from: T,
  start: ColorTypeMap[T],
  end: ColorTypeMap[T],
  colorsNumber: number
) {
  const startRgbValue = Converter.convert(from, 'RGB', start);
  const endRgbValue = Converter.convert(from, 'RGB', end);
  const scale: ColorTypeMap['RGB'][] = [];
  for (let i = 0; i < colorsNumber; i++) {
    const r = startRgbValue.r + ((endRgbValue.r - startRgbValue.r) / colorsNumber) * i;
    const g = startRgbValue.g + ((endRgbValue.g - startRgbValue.g) / colorsNumber) * i;
    const b = startRgbValue.b + ((endRgbValue.b - startRgbValue.b) / colorsNumber) * i;
    scale.push({ r, g, b });
  }
  return scale;
}
