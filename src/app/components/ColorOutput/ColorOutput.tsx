import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { ColorTypeMap } from '@/app/types';
import { isNumber } from '@/lib/helpers';
import { Converter } from '@/lib/services';

const MAX_DECIMALS = 3;

interface ColorOutputProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  value: ColorTypeMap[keyof ColorTypeMap];
  from: keyof ColorTypeMap;
  to: keyof ColorTypeMap;
}

export function ColorOutput({ value, from, to, className, ...rest }: ColorOutputProps) {
  const convertedValue = Converter.convert(from, to, value);

  return (
    <ul className={classNames('flex flex-col border-2 p-2 rounded-sm justify-center min-w-[150px]', className)} {...rest}>
      {Object.entries(convertedValue).map(([key, value]) => (
        <li key={key} className="p-1 pointer-events-none">
          <span className="font-bold">{key.toUpperCase()}: </span>
          {formatValue(value)}
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
