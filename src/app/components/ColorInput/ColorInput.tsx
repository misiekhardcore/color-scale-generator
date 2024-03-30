import { ColorTypeMap } from '@/app/types';
import { Input } from '@/app/components';
import { isNumber } from '@/lib/helpers';

import styles from './ColorInput.module.scss';

type ColorInputProps = {
  value: ColorTypeMap[keyof ColorTypeMap];
  onChange: (value: ColorTypeMap[keyof ColorTypeMap]) => void;
};

export function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <div className={styles.ColorInput}>
      {Object.entries(value).map(([k, v]) => (
        <Input
          key={k}
          label={k.toUpperCase()}
          value={v}
          onChange={(newValue) =>
            onChange({ ...value, [k]: isNumber(newValue) ? +newValue : newValue })
          }
          min={0}
          type={isNumber(v) ? 'number' : 'text'}
        />
      ))}
    </div>
  );
}
