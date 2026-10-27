import { type JSX, useMemo } from 'react';

import type { ColorTypeMap } from '@/app/types';

import type { InputComponentProps } from './Inputs';
import { inputComponents } from './Inputs';

interface ColorInputProps<T extends keyof ColorTypeMap = keyof ColorTypeMap>
  extends InputComponentProps<T> {
  type: T;
}

export function ColorInput<T extends keyof ColorTypeMap = keyof ColorTypeMap>({
  value,
  onChange,
  type,
}: ColorInputProps<T>) {
  const InputComponent = useMemo(
    () => inputComponents[type] as (props: InputComponentProps<T>) => JSX.Element,
    [type]
  );
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] gap-2">
      <InputComponent value={value} onChange={onChange} />
    </div>
  );
}

export function getInputComponent<T extends keyof ColorTypeMap>(
  type: T
): (props: InputComponentProps<T>) => JSX.Element {
  return inputComponents[type];
}
