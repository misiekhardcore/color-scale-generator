import { ClickableColorOutput, Selector } from '@/app/components';
import type { ColorSpace, Color } from '@/app/types';
import { COLOR_SPACES } from '@/app/constants';

interface ScaleResultsProps {
  scale: Color[];
  colorSpace: ColorSpace;
  onColorSpaceChange: (newColorSpace: ColorSpace) => void;
}

export function ScaleResults({ scale, colorSpace, onColorSpaceChange }: ScaleResultsProps) {
  return (
    <div className="flex gap-2 flex-wrap w-full items-center">
      <Selector
        label="Color scale calculation space"
        items={COLOR_SPACES}
        selected={colorSpace}
        onChange={onColorSpaceChange}
      />
      <div className="flex gap-2 flex-wrap w-full items-center">
        {scale.map((color, index) => (
          <ClickableColorOutput key={index} value={color} type={colorSpace} />
        ))}
      </div>
    </div>
  );
}
