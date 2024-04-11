import { ColorTypeMap } from '@/app/types';
import { Input } from '@/app/components';
import { Validator } from '@/lib/services';

import { InputComponentProps } from './types';

const KEY = 'RGB';
type KEY = 'RGB';

export function InputRgb({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange<T extends keyof ColorTypeMap[KEY]>(key: T, newValue: string) {
    const newRgb = { ...value, [key]: +newValue };
    if (!Validator.validate(KEY, newRgb)) return;
    onChange(newRgb);
  }

  function getChangeHandler<T extends keyof ColorTypeMap[KEY]>(key: T) {
    return (newValue: string) => handleChange(key, newValue);
  }

  return (
    <>
      <Input
        label="R"
        value={value.r}
        onChange={getChangeHandler('r')}
        min={0}
        max={255}
        step={1}
        type="number"
      />
      <Input
        label="G"
        value={value.g}
        onChange={getChangeHandler('g')}
        min={0}
        max={255}
        step={1}
        type="number"
      />
      <Input
        label="B"
        value={value.b}
        onChange={getChangeHandler('b')}
        min={0}
        max={255}
        step={1}
        type="number"
      />
    </>
  );
}
