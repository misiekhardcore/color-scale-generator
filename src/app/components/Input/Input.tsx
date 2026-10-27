'use client';

import { ChangeEvent, ComponentProps, useId } from 'react';

import { Input as InputPrimitive } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { cn } from '@/lib/utils';

type Value = string | number | undefined;

interface InputProps extends Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'className'> {
  value?: Value;
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  /** Visually hides the label while keeping it available to assistive technology */
  hideLabel?: boolean;
  className?: string;
}

export function Input({
  value,
  onChange,
  label,
  hideLabel,
  className,
  id,
  type,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <Label htmlFor={inputId} className={cn(hideLabel && 'sr-only')}>
        {label}
      </Label>
      <InputPrimitive
        {...rest}
        id={inputId}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value, event)}
      />
    </div>
  );
}
