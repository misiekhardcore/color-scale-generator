import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type Value = string | number | undefined;

interface InputProps<T extends Value> extends Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'capture'
> {
  value?: T;
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function Input<T extends Value>({
  value,
  onChange,
  label,
  className,
  type,
  ...rest
}: InputProps<T>) {
  const inputClasses = classNames(
    'w-full',
    type === 'color' && 'h-10 p-0 m-0'
  );

  return (
    <label className={classNames('flex flex-col gap-1', className)}>
      {label}
      <input {...rest} type={type} className={inputClasses} value={value} onChange={(e) => onChange(e.target.value, e)} />
    </label>
  );
}
