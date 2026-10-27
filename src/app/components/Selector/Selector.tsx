'use client';

import { useId } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';
import { isNumber } from '@/lib/helpers';
import { cn } from '@/lib/utils';

type Value = string | number;

interface SelectorProps<T extends Value> {
  label: string;
  items: readonly T[];
  selected: T;
  onChange: (value: T) => void;
  /** Visually hides the label while keeping it available to assistive technology */
  hideLabel?: boolean;
  className?: string;
  triggerClassName?: string;
}

export function Selector<T extends Value>({
  items,
  selected,
  onChange,
  label,
  hideLabel,
  className,
  triggerClassName,
}: SelectorProps<T>) {
  const controlId = useId();

  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <Label htmlFor={controlId} className={cn(hideLabel && 'sr-only')}>
        {label}
      </Label>
      <Select
        value={String(selected)}
        onValueChange={(value) => onChange((isNumber(value) ? +value : value) as T)}
      >
        <SelectTrigger id={controlId} className={cn('w-full', triggerClassName)}>
          <SelectValue>{String(selected)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={`${item}`} value={`${item}`}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
