'use client';

import { ClickableColorOutput } from '@/app/components/ClickableColorOutput';
import { ExportModal } from '@/app/components/ExportModal';
import { Section } from '@/app/components/Section';
import type { Color, ColorSpace } from '@/app/types';
import { Converter } from '@/lib/services';

interface ScaleResultsProps {
  scale: Color[];
  colorSpace: ColorSpace;
}

export function ScaleResults({ scale, colorSpace }: ScaleResultsProps) {
  const gradient = scale.map((color) => Converter.convert(colorSpace, 'HEX', color).hex).join(', ');

  return (
    <Section
      title="Results"
      description={`${scale.length} ${scale.length === 1 ? 'color' : 'colors'} interpolated in ${colorSpace}. Click a swatch to show its values in another color space.`}
      action={<ExportModal from={colorSpace} scale={scale} />}
      contentClassName="gap-3"
    >
      <div
        role="img"
        aria-label={`Preview of the generated ${scale.length} color scale`}
        className="h-10 w-full rounded-lg border"
        style={{ backgroundImage: `linear-gradient(to right, ${gradient})` }}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-3">
        {scale.map((color, index) => (
          <ClickableColorOutput key={index} value={color} type={colorSpace} />
        ))}
      </div>
    </Section>
  );
}
