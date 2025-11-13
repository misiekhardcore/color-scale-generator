import { Input } from '@/app/components';
import { ColorTypeMap } from '@/app/types';
import { Validator } from '@/lib/services';

import { InputComponentProps } from './types';

const HWB_KEY = 'HWB';
type KEY = 'HWB';

export function HwbInput({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange<T extends keyof ColorTypeMap[KEY]>(key: T, newValue: string) {
    const newHwb = { ...value, [key]: +newValue };
    if (!Validator.validate(HWB_KEY, newHwb)) return;
    onChange(newHwb);
  }

  function getChangeHandler<T extends keyof ColorTypeMap[KEY]>(key: T) {
    return (newValue: string) => handleChange(key, newValue);
  }

  return (
    <>
      <Input
        label="H"
        value={value.h}
        onChange={getChangeHandler('h')}
        min={0}
        max={360}
        step={1}
        type="number"
      />
      <Input
        label="W"
        value={value.w}
        onChange={getChangeHandler('w')}
        min={0}
        max={1}
        step={0.01}
        type="number"
      />
      <Input
        label="B"
        value={value.b}
        onChange={getChangeHandler('b')}
        min={0}
        max={1}
        step={0.01}
        type="number"
      />
    </>
  );
}
