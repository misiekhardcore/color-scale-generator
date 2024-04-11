import { Input } from '@/app/components';
import { ColorTypeMap } from '@/app/types';
import { Validator } from '@/lib/services';

import { InputComponentProps } from './types';

const KEY = 'HEX';
type KEY = 'HEX';

export function HexInput({ value, onChange }: InputComponentProps<KEY>) {
  function handleChange<T extends keyof ColorTypeMap[KEY]>(newValue: ColorTypeMap[KEY][T]) {
    const newHex = { hex: newValue };
    if (!Validator.validate(KEY, newHex)) return;
    onChange(newHex);
  }
  return (
    <>
      <Input label="Hex" value={value.hex} onChange={handleChange} type="text" maxLength={7} />
    </>
  );
}
