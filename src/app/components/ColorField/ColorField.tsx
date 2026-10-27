'use client';

import { ColorInput } from '@/app/components/ColorInput';
import { ColorOutput } from '@/app/components/ColorOutput';
import type { ColorSpace, ColorTypeMap } from '@/app/types';
import { cn } from '@/lib/utils';

interface ColorFieldProps {
  label: string;
  /** Color space the channel inputs accept values in */
  colorSpace: ColorSpace;
  value: ColorTypeMap[ColorSpace];
  onChange: (value: ColorTypeMap[ColorSpace]) => void;
  /** Current color as a hex string, used by the native picker */
  hexValue: string;
  onHexChange: (hex: string) => void;
  /** Color space the value read-out is displayed in */
  previewSpace: ColorSpace;
  className?: string;
}

export function ColorField({
  label,
  colorSpace,
  value,
  onChange,
  hexValue,
  onHexChange,
  previewSpace,
  className,
}: ColorFieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-3 rounded-lg border bg-muted/30 p-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <input
          type="color"
          aria-label={`${label} picker`}
          className="h-8 w-12 shrink-0 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
          value={hexValue}
          onChange={(event) => onHexChange(event.target.value)}
        />
      </div>
      <ColorInput type={colorSpace} value={value} onChange={onChange} />
      <ColorOutput
        value={value}
        from={colorSpace}
        to={previewSpace}
        aria-label={`${label} values`}
        className="text-xs"
      />
    </div>
  );
}
