'use client';

import { DownloadIcon } from 'lucide-react';

import { ClickableColorOutput } from '@/app/components/ClickableColorOutput';
import { Section } from '@/app/components/Section';
import { Button } from '@/app/components/ui/button';
import type { Color, ColorSpace } from '@/app/types';
import { Converter } from '@/lib/services';

interface ScaleResultsProps {
  scale: Color[];
  colorSpace: ColorSpace;
  onExportClick: () => void;
}

export function ScaleResults({ scale, colorSpace, onExportClick }: ScaleResultsProps) {
  const gradient = scale.map((color) => Converter.convert(colorSpace, 'HEX', color).hex).join(', ');

  return (
    <Section
      title="Results"
      description={`${scale.length} ${scale.length === 1 ? 'color' : 'colors'} interpolated in ${colorSpace}. Click a swatch to show its values in another color space.`}
      action={
        <Button onClick={onExportClick}>
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
      }
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
