'use client';

import { ColorField } from '@/app/components/ColorField';
import { Section } from '@/app/components/Section';
import { Selector } from '@/app/components/Selector';
import { COLOR_SPACES } from '@/app/constants';
import type { ColorSpace, ColorTypeMap } from '@/app/types';

interface InputColorsSectionProps {
  isTwoColor: boolean;
  inputColorSpace: ColorSpace;
  onInputColorSpaceChange: (colorSpace: ColorSpace) => void;
  previewColorSpace: ColorSpace;
  onPreviewColorSpaceChange: (colorSpace: ColorSpace) => void;
  inputColorStart: ColorTypeMap[ColorSpace];
  onInputColorStartChange: (color: ColorTypeMap[ColorSpace]) => void;
  inputColorEnd: ColorTypeMap[ColorSpace];
  onInputColorEndChange: (color: ColorTypeMap[ColorSpace]) => void;
  hexInputColorStart: { hex: string };
  hexInputColorEnd: { hex: string };
  onHexInputColorStartChange: (hex: string) => void;
  onHexInputColorEndChange: (hex: string) => void;
}

export function InputColorsSection({
  isTwoColor,
  inputColorSpace,
  onInputColorSpaceChange,
  previewColorSpace,
  onPreviewColorSpaceChange,
  inputColorStart,
  onInputColorStartChange,
  inputColorEnd,
  onInputColorEndChange,
  hexInputColorStart,
  hexInputColorEnd,
  onHexInputColorStartChange,
  onHexInputColorEndChange,
}: InputColorsSectionProps) {
  return (
    <Section
      title="Input colors"
      description="Pick the colors the scale is built from."
      contentClassName="gap-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Selector
          label="Enter colors as"
          items={COLOR_SPACES}
          selected={inputColorSpace}
          onChange={onInputColorSpaceChange}
        />
        <Selector
          label="Show values as"
          items={COLOR_SPACES}
          selected={previewColorSpace}
          onChange={onPreviewColorSpaceChange}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <ColorField
          label="Start color"
          colorSpace={inputColorSpace}
          value={inputColorStart}
          onChange={onInputColorStartChange}
          hexValue={hexInputColorStart.hex}
          onHexChange={onHexInputColorStartChange}
          previewSpace={previewColorSpace}
        />
        {isTwoColor ? (
          <ColorField
            label="End color"
            colorSpace={inputColorSpace}
            value={inputColorEnd}
            onChange={onInputColorEndChange}
            hexValue={hexInputColorEnd.hex}
            onHexChange={onHexInputColorEndChange}
            previewSpace={previewColorSpace}
          />
        ) : null}
      </div>
    </Section>
  );
}
