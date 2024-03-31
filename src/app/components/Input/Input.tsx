import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

type Value = string | number | undefined;

type InputProps<T extends Value> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'capture'
> & {
  value?: T;
  onChange: (value: T, e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export function Input<T extends Value>({
  value,
  onChange,
  label,
  className,
  ...rest
}: InputProps<T>) {
  return (
    <label className={classNames(styles.Input, className)}>
      {label}
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value as T, e)} />
    </label>
  );
}
