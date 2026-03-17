import {
  Button,
  ColorControlRow,
  ColorInput,
  ColorOutput,
  Input,
  Selector,
  StepInputs,
} from '@/app/components';
import type { ColorSpace, ColorTypeMap } from '@/app/types';
import { COLOR_SPACES } from '@/app/constants';

const MAX_RESULTS_COUNT = 100;

type ScaleMode = 'two-color' | 'step';

interface ColorScaleFormProps {
  scaleMode: ScaleMode;
  onScaleModeChange: (mode: ScaleMode) => void;
  colorsNumber: number;
  onColorsNumberChange: (count: number) => void;
  inputColorSpace: ColorSpace;
  onInputColorSpaceChange: (colorSpace: ColorSpace) => void;
  outputColorSpace: ColorSpace;
  onOutputColorSpaceChange: (colorSpace: ColorSpace) => void;
  resultsColorSpace: ColorSpace;
  inputColorStart: ColorTypeMap[ColorSpace];
  onInputColorStartChange: (color: ColorTypeMap[ColorSpace]) => void;
  inputColorEnd: ColorTypeMap[ColorSpace];
  onInputColorEndChange: (color: ColorTypeMap[ColorSpace]) => void;
  hexInputColorStart: { hex: string };
  hexInputColorEnd: { hex: string };
  onHexInputColorStartChange: (hex: string) => void;
  onHexInputColorEndChange: (hex: string) => void;
  step: Partial<Record<string, number>>;
  onStepChange: (step: Partial<Record<string, number>>) => void;
  onExportClick: () => void;
}

export function ColorScaleForm({
  scaleMode,
  onScaleModeChange,
  colorsNumber,
  onColorsNumberChange,
  inputColorSpace,
  onInputColorSpaceChange,
  outputColorSpace,
  onOutputColorSpaceChange,
  resultsColorSpace,
  inputColorStart,
  onInputColorStartChange,
  inputColorEnd,
  onInputColorEndChange,
  hexInputColorStart,
  hexInputColorEnd,
  onHexInputColorStartChange,
  onHexInputColorEndChange,
  step,
  onStepChange,
  onExportClick,
}: ColorScaleFormProps) {
  const isTwoColor = scaleMode === 'two-color';

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 justify-center">
      <div className="grid grid-cols-3 gap-2 items-start">
        {/* Row 1: export action + scale mode */}
        <Button onClick={onExportClick} className="col-start-1 self-end">
          Export scale
        </Button>
        <Selector
          label="Scale mode"
          items={['two-color', 'step'] as const}
          selected={scaleMode}
          onChange={(value) => onScaleModeChange(value)}
        />

        {/* Row 2: hex color pickers.
            col-start-1 forces this item to column 1, starting a new row.
            No selector in col 1 here — the picker itself occupies col 1. */}
        <Input
          label="Color"
          type="color"
          value={hexInputColorStart.hex}
          onChange={onHexInputColorStartChange}
          className="col-start-1"
        />
        {isTwoColor && (
          <Input
            label="Color"
            type="color"
            value={hexInputColorEnd.hex}
            onChange={onHexInputColorEndChange}
          />
        )}

        {/* Row 3: input color space selector + per-color channel inputs */}
        <ColorControlRow
          selector={
            <Selector
              label="Input color space"
              items={COLOR_SPACES}
              selected={inputColorSpace}
              onChange={onInputColorSpaceChange}
            />
          }
          startControl={
            <ColorInput
              type={inputColorSpace}
              value={inputColorStart}
              onChange={(newValue) => onInputColorStartChange(newValue)}
            />
          }
          endControl={
            isTwoColor ? (
              <ColorInput
                type={inputColorSpace}
                value={inputColorEnd}
                onChange={(newValue) => onInputColorEndChange(newValue)}
              />
            ) : undefined
          }
        />

        {/* Row 4: output color space selector + per-color output displays */}
        <ColorControlRow
          selector={
            <Selector
              label="Output color space"
              items={COLOR_SPACES}
              selected={outputColorSpace}
              onChange={onOutputColorSpaceChange}
            />
          }
          startControl={
            <ColorOutput
              value={inputColorStart}
              from={inputColorSpace}
              to={outputColorSpace}
              className="self-end"
            />
          }
          endControl={
            isTwoColor ? (
              <ColorOutput
                value={inputColorEnd}
                from={inputColorSpace}
                to={outputColorSpace}
                className="self-end"
              />
            ) : undefined
          }
        />

        {/* Row 5: number of colors in the scale */}
        <Input
          className="col-span-3"
          value={colorsNumber.toString()}
          onChange={(value) => onColorsNumberChange(parseInt(value))}
          label="Colors in scale"
          min={1}
          max={MAX_RESULTS_COUNT}
          type="number"
        />

        {/* Row 6 (step mode only): step value inputs */}
        {scaleMode === 'step' && (
          <div className="col-span-3 grid grid-cols-4 gap-2">
            <div className="col-span-4 font-semibold">
              Step values (in {resultsColorSpace} space):
            </div>
            <StepInputs colorSpace={resultsColorSpace} step={step} onStepChange={onStepChange} />
          </div>
        )}
      </div>
    </form>
  );
}
