import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

type Value = string | number | undefined;

type InputProps<T extends Value> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'capture'
> & {
  value: T;
  onChange: (value: T) => void;
  label: string;
};

export function Input<T extends Value>({ value, onChange, label, ...rest }: InputProps<T>) {
  return (
    <label className={styles.Input}>
      {label}
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value as T)} />
    </label>
  );
}
