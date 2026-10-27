import { ComponentProps } from 'react';

import { ColorTypeMap } from '@/app/types';
import { isNumber } from '@/lib/helpers';
import { Converter } from '@/lib/services';
import { cn } from '@/lib/utils';

const MAX_DECIMALS = 3;

interface ColorOutputProps extends ComponentProps<'ul'> {
  value: ColorTypeMap[keyof ColorTypeMap];
  from: keyof ColorTypeMap;
  to: keyof ColorTypeMap;
}

export function ColorOutput({ value, from, to, className, ...rest }: ColorOutputProps) {
  const convertedValue = Converter.convert(from, to, value);

  return (
    <ul
      className={cn(
        'flex flex-col justify-center gap-0.5 rounded-lg border bg-background/60 p-2 tabular-nums',
        className
      )}
      {...rest}
    >
      {Object.entries(convertedValue).map(([key, value]) => (
        <li key={key} className="pointer-events-none flex items-baseline justify-between gap-2">
          <span className="text-muted-foreground">{key.toUpperCase()}:</span>
          <span className="font-medium">{formatValue(value)}</span>
        </li>
      ))}
    </ul>
  );
}

function formatValue(value: string | number) {
  let formattedValue = '';
  if (isNumber(value)) {
    formattedValue = formatNumber(value);
  } else {
    formattedValue = value.toString().toUpperCase();
  }
  return formattedValue;
}

function formatNumber(num: string | number): string {
  const formattedNum = parseFloat(num.toString()).toFixed(MAX_DECIMALS);
  return formattedNum.includes('.') ? formattedNum.replace(/\.?0*$/, '') : formattedNum;
}
