'use client';

import { KeyboardEvent, useEffect, useState } from 'react';

import { ColorOutput } from '@/app/components/ColorOutput';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/components/ui/tooltip';
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

  useEffect(() => {
    setSelectedColorSpace(type);
  }, [type]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ColorOutput
          aria-label={`Color values in ${selectedColorSpace}. Activate to show them in ${nextColorSpace}.`}
          className="min-h-[124px] cursor-pointer transition-shadow focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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

function getContrastColor({ r, g, b }: ColorTypeMap['RGB']) {
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white';
}
