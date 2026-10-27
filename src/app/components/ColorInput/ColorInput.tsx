import { ColorTypeMap } from '@/app/types';

import { inputComponents, InputComponentProps } from './Inputs';

import type { JSX } from 'react';

interface ColorInputProps<T extends keyof ColorTypeMap = keyof ColorTypeMap>
  extends InputComponentProps<T> {
  type: T;
}

export function ColorInput({ value, onChange, type }: ColorInputProps) {
  const InputComponent = getInputComponent(type);
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
