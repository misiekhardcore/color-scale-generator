import { ColorTypeMap } from '@/app/types';
import { Validator } from '@/lib/services';
import { Input } from '@/app/components';

import { InputComponentProps } from './types';

const KEY = 'CMYK';
type KEY = 'CMYK';

export function CmykInput({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange<T extends keyof ColorTypeMap[KEY]>(key: T, newValue: string) {
    const newCmyk = { ...value, [key]: +newValue };
    if (!Validator.validate(KEY, newCmyk)) return;
    onChange(newCmyk);
  }

  function getChangeHandler<T extends keyof ColorTypeMap[KEY]>(key: T) {
    return (newValue: string) => handleChange(key, newValue);
  }

  return (
    <>
      <Input
        label="C"
        value={value.c}
        onChange={getChangeHandler('c')}
        type="number"
        max={1}
        min={0}
        step={0.01}
      />
      <Input
        label="M"
        value={value.m}
        onChange={getChangeHandler('m')}
        type="number"
        max={1}
        min={0}
        step={0.01}
      />
      <Input
        label="Y"
        value={value.y}
        onChange={getChangeHandler('y')}
        type="number"
        max={1}
        min={0}
        step={0.01}
      />
      <Input
        label="K"
        value={value.k}
        onChange={getChangeHandler('k')}
        type="number"
        max={1}
        min={0}
        step={0.01}
      />
    </>
  );
}
