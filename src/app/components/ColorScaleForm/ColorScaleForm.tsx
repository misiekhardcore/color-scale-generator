import { Button, ColorInput, ColorOutput, Input, Selector, StepInputs } from '@/app/components';
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
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 justify-center">
      <div className="grid grid-cols-3 gap-2 items-start">
        <Button onClick={onExportClick} className="self-end">
          Export scale
        </Button>
        <Selector
          label="Scale mode"
          items={['two-color', 'step'] as const}
          selected={scaleMode}
          onChange={(value) => onScaleModeChange(value)}
        />
        <div></div>
        <Input
          label="Color"
          type="color"
          value={hexInputColorStart.hex}
          onChange={onHexInputColorStartChange}
        />
        {scaleMode === 'two-color' && (
          <Input
            label="Color"
            type="color"
            value={hexInputColorEnd.hex}
            onChange={onHexInputColorEndChange}
          />
        )}
        {scaleMode === 'step' && <div></div>}
        <Selector
          label="Input color space"
          items={COLOR_SPACES}
          selected={inputColorSpace}
          onChange={onInputColorSpaceChange}
        />
        <ColorInput
          type={inputColorSpace}
          value={inputColorStart}
          onChange={(newValue) => onInputColorStartChange(newValue)}
        />
        {scaleMode === 'two-color' && (
          <ColorInput
            type={inputColorSpace}
            value={inputColorEnd}
            onChange={(newValue) => onInputColorEndChange(newValue)}
          />
        )}
        {scaleMode === 'step' && <div></div>}
        <Selector
          label="Output color space"
          items={COLOR_SPACES}
          selected={outputColorSpace}
          onChange={onOutputColorSpaceChange}
        />
        <ColorOutput
          value={inputColorStart}
          from={inputColorSpace}
          to={outputColorSpace}
          className="self-end"
        />
        {scaleMode === 'two-color' && (
          <ColorOutput
            value={inputColorEnd}
            from={inputColorSpace}
            to={outputColorSpace}
            className="self-end"
          />
        )}
        {scaleMode === 'step' && <div></div>}
        <Input
          className="col-span-3"
          value={colorsNumber.toString()}
          onChange={(value) => onColorsNumberChange(parseInt(value))}
          label="Colors in scale"
          min={1}
          max={MAX_RESULTS_COUNT}
          type="number"
        />
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
