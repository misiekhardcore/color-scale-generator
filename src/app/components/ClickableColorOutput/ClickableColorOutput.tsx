'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@konopskidev/ui';
import type { KeyboardEvent } from 'react';
import { useState } from 'react';

import { ColorOutput } from '@/app/components/ColorOutput';
import { COLOR_SPACES } from '@/app/constants';
import type { ColorTypeMap } from '@/app/types';
import { Converter } from '@/lib/services';

import { SteadyClickController } from './SteadyClickController';

type ClickableColorOutputProps = {
  value: ColorTypeMap[keyof ColorTypeMap];
  type: keyof ColorTypeMap;
};

export function ClickableColorOutput({ value, type }: ClickableColorOutputProps) {
  const [selectedColorSpace, setSelectedColorSpace] = useState<keyof ColorTypeMap>(type);
  const convertedColor = Converter.convert(type, selectedColorSpace, value);
  const rgbColor = Converter.convert(type, 'RGB', value);

  function cycleColorSpace() {
    setSelectedColorSpace((currentColorSpace) =>
      getNextArrayElementInLoop(COLOR_SPACES, currentColorSpace)
    );
  }

  const dragScrollClickFix = new SteadyClickController(cycleColorSpace);

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cycleColorSpace();
    }
  }

  const backgroundColor = rgbToStyle(rgbColor);
  const borderColor = rgbToStyle(getOpositeRgbColor(rgbColor));
  const textColor = getContrastColor(rgbColor);
  const nextColorSpace = getNextArrayElementInLoop(COLOR_SPACES, selectedColorSpace);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ColorOutput
          aria-label={`Color values in ${selectedColorSpace}. Activate to show them in ${nextColorSpace}.`}
          className="min-h-31 cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          value={convertedColor}
          from={selectedColorSpace}
          to={selectedColorSpace}
          style={{ backgroundColor, color: textColor, borderColor }}
          tabIndex={0}
          onMouseDownCapture={dragScrollClickFix.onMouseDown}
          onMouseUpCapture={dragScrollClickFix.onMouseUp}
          onDragEndCapture={dragScrollClickFix.onMouseUp}
          onKeyDown={handleKeyDown}
        />
      </TooltipTrigger>
      <TooltipContent>Show as {nextColorSpace}</TooltipContent>
    </Tooltip>
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

// Luminance at which black and white text have the same contrast ratio against
// a background, so picking a side by this threshold always yields the more
// readable of the two.
const EQUAL_CONTRAST_LUMINANCE = 0.179;

function getContrastColor(rgb: ColorTypeMap['RGB']) {
  return getRelativeLuminance(rgb) > EQUAL_CONTRAST_LUMINANCE ? 'black' : 'white';
}

function getRelativeLuminance({ r, g, b }: ColorTypeMap['RGB']) {
  const [red, green, blue] = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
