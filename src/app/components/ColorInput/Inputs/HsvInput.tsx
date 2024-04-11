import { Input } from '@/app/components';
import { ColorTypeMap } from '@/app/types';
import { Validator } from '@/lib/services';

import { InputComponentProps } from './types';

const KEY = 'HSV';
type KEY = 'HSV';

export function HsvInput({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange<T extends keyof ColorTypeMap[KEY]>(key: T, newValue: string) {
    const newHsv = { ...value, [key]: +newValue };
    if (!Validator.validate(KEY, newHsv)) return;
    onChange(newHsv);
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
        label="S"
        value={value.s}
        onChange={getChangeHandler('s')}
        min={0}
        max={1}
        step={0.01}
        type="number"
      />
      <Input
        label="V"
        value={value.v}
        onChange={getChangeHandler('v')}
        min={0}
        max={1}
        step={0.01}
        type="number"
      />
    </>
  );
}
