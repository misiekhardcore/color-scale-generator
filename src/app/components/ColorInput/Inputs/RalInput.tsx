import { Input } from '@/app/components';
import { Validator } from '@/lib/services';

import { InputComponentProps } from './types';

const KEY = 'RAL';
type KEY = 'RAL';

export function RalInput({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange(newValue: string) {
    const newRal = { ral: +newValue };
    if (!Validator.validate(KEY, newRal)) return;
    onChange(newRal);
  }
  return (
    <>
      <Input
        label="RAL"
        value={value.ral}
        onChange={handleChange}
        type="number"
        maxLength={4}
        max={9999}
      />
    </>
  );
}
