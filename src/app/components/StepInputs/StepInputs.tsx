import { Input } from '@/app/components';
import type { ColorSpace } from '@/app/types';

interface StepInputsProps {
  colorSpace: ColorSpace;
  step: Partial<Record<string, number>>;
  onStepChange: (newStep: Partial<Record<string, number>>) => void;
}

export function StepInputs({ colorSpace, step, onStepChange }: StepInputsProps) {
  const handleChange = (key: string, value: string) => {
    onStepChange({ ...step, [key]: parseFloat(value) || 0 });
  };

  // For HEX and RAL, step should be in RGB format
  if (colorSpace === 'HEX' || colorSpace === 'RAL' || colorSpace === 'RGB') {
    return (
      <>
        <Input
          label="Step R"
          type="number"
          value={((step as { r?: number }).r || 0).toString()}
          onChange={(value) => handleChange('r', value)}
        />
        <Input
          label="Step G"
          type="number"
          value={((step as { g?: number }).g || 0).toString()}
          onChange={(value) => handleChange('g', value)}
        />
        <Input
          label="Step B"
          type="number"
          value={((step as { b?: number }).b || 0).toString()}
          onChange={(value) => handleChange('b', value)}
        />
      </>
    );
  }

  if (colorSpace === 'CMYK') {
    return (
      <>
        <Input
          label="Step C"
          type="number"
          value={((step as { c?: number }).c || 0).toString()}
          onChange={(value) => handleChange('c', value)}
        />
        <Input
          label="Step M"
          type="number"
          value={((step as { m?: number }).m || 0).toString()}
          onChange={(value) => handleChange('m', value)}
        />
        <Input
          label="Step Y"
          type="number"
          value={((step as { y?: number }).y || 0).toString()}
          onChange={(value) => handleChange('y', value)}
        />
        <Input
          label="Step K"
          type="number"
          value={((step as { k?: number }).k || 0).toString()}
          onChange={(value) => handleChange('k', value)}
        />
      </>
    );
  }

  if (colorSpace === 'HSL') {
    return (
      <>
        <Input
          label="Step H"
          type="number"
          value={((step as { h?: number }).h || 0).toString()}
          onChange={(value) => handleChange('h', value)}
        />
        <Input
          label="Step S"
          type="number"
          value={((step as { s?: number }).s || 0).toString()}
          onChange={(value) => handleChange('s', value)}
        />
        <Input
          label="Step L"
          type="number"
          value={((step as { l?: number }).l || 0).toString()}
          onChange={(value) => handleChange('l', value)}
        />
      </>
    );
  }

  if (colorSpace === 'HSV') {
    return (
      <>
        <Input
          label="Step H"
          type="number"
          value={((step as { h?: number }).h || 0).toString()}
          onChange={(value) => handleChange('h', value)}
        />
        <Input
          label="Step S"
          type="number"
          value={((step as { s?: number }).s || 0).toString()}
          onChange={(value) => handleChange('s', value)}
        />
        <Input
          label="Step V"
          type="number"
          value={((step as { v?: number }).v || 0).toString()}
          onChange={(value) => handleChange('v', value)}
        />
      </>
    );
  }

  if (colorSpace === 'HWB') {
    return (
      <>
        <Input
          label="Step H"
          type="number"
          value={((step as { h?: number }).h || 0).toString()}
          onChange={(value) => handleChange('h', value)}
        />
        <Input
          label="Step W"
          type="number"
          value={((step as { w?: number }).w || 0).toString()}
          onChange={(value) => handleChange('w', value)}
        />
        <Input
          label="Step B"
          type="number"
          value={((step as { b?: number }).b || 0).toString()}
          onChange={(value) => handleChange('b', value)}
        />
      </>
    );
  }

  return null;
}
