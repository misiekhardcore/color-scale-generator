'use client';

import { useState } from 'react';

import { Converter, Scaler } from '@/lib/services';
import { ClickableColorOutput, ColorInput, ColorOutput, Input, Selector } from '@/app/components';

import { ColorSpace, ColorTypeMap } from './types';
import { COLOR_SPACES } from './constants';

const INITIAL_RESULTS_COUNT = 10;
const MAX_RESULTS_COUNT = 100;
const INITIAL_INPUT_COLOR_SPACE: keyof ColorTypeMap = 'RGB';
const INITIAL_OUTPUT_COLOR_SPACE: keyof ColorTypeMap = 'HWB';

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
  const scale = Scaler.getScale(
    inputColorSpace,
    resultsColorSpace,
    inputColorStart,
    inputColorEnd,
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
            type={inputColorSpace}
            value={inputColorStart}
            onChange={(newValue) => setInputColorStart(newValue)}
          />
          <ColorInput
            type={inputColorSpace}
            value={inputColorEnd}
            onChange={(newValue) => setInputColorEnd(newValue)}
          />
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
    </main>
  );
}
