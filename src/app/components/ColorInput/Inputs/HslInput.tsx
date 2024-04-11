import { ColorTypeMap } from '@/app/types';
import { Input } from '@/app/components';
import { Validator } from '@/lib/services';

import { InputComponentProps } from './types';

const KEY = 'HSL';
type KEY = 'HSL';

export function HslInput({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange<T extends keyof ColorTypeMap[KEY]>(key: T, newValue: string) {
    const newHsl = { ...value, [key]: +newValue };
    if (!Validator.validate(KEY, newHsl)) return;
    onChange(newHsl);
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
        type="number"
        min={0}
        max={360}
        step={1}
      />
      <Input
        label="S"
        value={value.s}
        onChange={getChangeHandler('s')}
        type="number"
        min={0}
        max={1}
        step={0.01}
      />
      <Input
        label="L"
        value={value.l}
        onChange={getChangeHandler('l')}
        type="number"
        min={0}
        max={1}
        step={0.01}
      />
    </>
  );
}
