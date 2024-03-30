'use client';

import { useState } from 'react';

import { Converter } from '@/lib/services';
import { Button, ColorInput, ColorOutput, Input, Selector } from '@/app/components';

import { ColorSpace, ColorTypeMap } from './types';
import { COLOR_SPACES } from './constants';

const INITIAL_COLOR = {
  r: 127,
  g: 127,
  b: 127,
};

export default function Home() {
  const [colorsNumber, setColorsNumber] = useState(5);
  const [inputColorSpace, setInputColorSpace] = useState<ColorSpace>('RGB');
  const [outputColorSpace, setOutputColorSpace] = useState<ColorSpace>('CMYK');
  const [inputColorStart, setInputColorStart] = useState<ColorTypeMap[ColorSpace]>(INITIAL_COLOR);
  const [inputColorEnd, setInputColorEnd] = useState<ColorTypeMap[ColorSpace]>(INITIAL_COLOR);

  function changeInputColorSpace(newColorSpace: ColorSpace) {
    const converter = Converter.getConverter(inputColorSpace, newColorSpace);
    const convertedColorStart = converter(inputColorStart);
    const convertedColorEnd = converter(inputColorEnd);
    setInputColorStart(convertedColorStart);
    setInputColorEnd(convertedColorEnd);
    setInputColorSpace(newColorSpace);
  }

  function changeOutputColorSpace(newColorSpace: ColorSpace) {
    setOutputColorSpace(newColorSpace);
  }

  return (
    <main className="grid gap-4">
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
        <div className="flex gap-4 items-start">
          <Selector
            label="Input color space"
            items={COLOR_SPACES}
            selected={inputColorSpace}
            onChange={changeInputColorSpace}
          />
          <div className="flex gap-4">
            <ColorInput
              value={inputColorStart}
              onChange={(newValue) => setInputColorStart(newValue)}
            />
            <ColorInput value={inputColorEnd} onChange={(newValue) => setInputColorEnd(newValue)} />
          </div>
          <div className="flex flex-col gap-4">
            <Selector
              label="Output color space"
              items={COLOR_SPACES}
              selected={outputColorSpace}
              onChange={changeOutputColorSpace}
            />
            <ColorOutput value={inputColorStart} from={inputColorSpace} to={outputColorSpace} />
            <ColorOutput value={inputColorEnd} from={inputColorSpace} to={outputColorSpace} />
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <Input
            value={colorsNumber.toString()}
            onChange={(value) => setColorsNumber(parseInt(value))}
            label="How many results"
            min={1}
            max={10}
            type="number"
          />
          <Button type="submit">calculate</Button>
        </div>
      </form>
    </main>
  );
}
