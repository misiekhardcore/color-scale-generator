'use client';

import { MouseEvent, useEffect, useState } from 'react';

import { ColorTypeMap } from '@/app/types';
import { ColorOutput } from '@/app/components';
import { Converter } from '@/lib/services';
import { COLOR_SPACES } from '@/app/constants';

import { SteadyClickController } from './SteadyClickController';

const DEFAULT_COLOR_SPACE: keyof ColorTypeMap = 'RGB';

type ClickableColorOutputProps = {
  value: ColorTypeMap[keyof ColorTypeMap];
  from: keyof ColorTypeMap;
  to?: keyof ColorTypeMap;
};

export function ClickableColorOutput({ value, from, to }: ClickableColorOutputProps) {
  const dragScrollClickFix = new SteadyClickController(setNextColorSpace);
  const [selectedColorSpace, setSelectedColorSpace] = useState<keyof ColorTypeMap>(
    to || DEFAULT_COLOR_SPACE
  );
  const convertedColor = Converter.convert(from, selectedColorSpace, value);
  const rgbColor = Converter.convert(from, 'RGB', value);

  function setNextColorSpace(e: MouseEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) return;
    const nextColorSpace = getNextArrayElementInLoop(COLOR_SPACES, selectedColorSpace);
    setSelectedColorSpace(nextColorSpace);
  }

  const backgroundColor = rgbToStyle(rgbColor);
  const borderColor = rgbToStyle(getOpositeRgbColor(rgbColor));
  const textColor = getContrastColor(rgbColor);

  useEffect(() => {
    setSelectedColorSpace(to || DEFAULT_COLOR_SPACE);
  }, [to]);

  return (
    <ColorOutput
      className="min-h-[150px] cursor-pointer"
      value={convertedColor}
      from={selectedColorSpace}
      to={selectedColorSpace}
      style={{ backgroundColor, color: textColor, borderColor }}
      onMouseDownCapture={dragScrollClickFix.onMouseDown}
      onMouseUpCapture={dragScrollClickFix.onMouseUp}
      onDragEndCapture={dragScrollClickFix.onMouseUp}
    />
  );
}

function getNextArrayElementInLoop<T>(array: readonly T[], currentElement: T) {
  const currentIndex = array.indexOf(currentElement);
  if (currentIndex === array.length - 1) return array[0];
  if (currentIndex === -1) return array[0];
  return array[(currentIndex + 1) % array.length];
}

function getOpositeRgbColor({ r, g, b }: ColorTypeMap['RGB']) {
  return { r: 255 - r, g: 255 - g, b: 255 - b };
}

function rgbToStyle({ r, g, b }: ColorTypeMap['RGB']) {
  return `rgb(${r}, ${g}, ${b})`;
}

function getContrastColor({ r, g, b }: ColorTypeMap['RGB']) {
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white';
}
