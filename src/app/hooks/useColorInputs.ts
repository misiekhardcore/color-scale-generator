import { useState } from 'react';
import { Converter } from '@/lib/services';
import type { ColorSpace, ColorTypeMap } from '@/app/types';

const INITIAL_INPUT_COLOR_SPACE: keyof ColorTypeMap = 'RGB';

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

export function useColorInputs() {
  const [inputColorSpace, setInputColorSpace] = useState<ColorSpace>(INITIAL_INPUT_COLOR_SPACE);
  const [inputColorStart, setInputColorStart] =
    useState<ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE]>(INITIAL_COLOR_START);
  const [inputColorEnd, setInputColorEnd] =
    useState<ColorTypeMap[typeof INITIAL_INPUT_COLOR_SPACE]>(INITIAL_COLOR_END);

  const hexInputColorStart = Converter.convert(inputColorSpace, 'HEX', inputColorStart);
  const hexInputColorEnd = Converter.convert(inputColorSpace, 'HEX', inputColorEnd);

  function changeInputColorSpace(newColorSpace: ColorSpace) {
    const converter = Converter.getConverter(inputColorSpace, newColorSpace);
    setInputColorStart(converter(inputColorStart));
    setInputColorEnd(converter(inputColorEnd));
    setInputColorSpace(newColorSpace);
  }

  function handleColorInputStartChange(newValue: string) {
    const convertedColor = Converter.convert('HEX', inputColorSpace, { hex: newValue });
    setInputColorStart(convertedColor);
  }

  function handleColorInputEndChange(newValue: string) {
    const convertedColor = Converter.convert('HEX', inputColorSpace, { hex: newValue });
    setInputColorEnd(convertedColor);
  }

  return {
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
  };
}
