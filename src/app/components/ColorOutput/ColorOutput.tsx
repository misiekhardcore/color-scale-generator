import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { ColorTypeMap } from '@/app/types';
import { isNumber } from '@/lib/helpers';
import { Converter } from '@/lib/services';

import styles from './ColorOutput.module.scss';

const MAX_DECIMALS = 3;

type ColorOutputProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  value: ColorTypeMap[keyof ColorTypeMap];
  from: keyof ColorTypeMap;
  to: keyof ColorTypeMap;
};

export function ColorOutput({ value, from, to, className, ...rest }: ColorOutputProps) {
  const convertedValue = Converter.convert(from, to, value);

  return (
    <ul className={classNames(styles.ColorOutput, className)} {...rest}>
      {Object.entries(convertedValue).map(([key, value]) => (
        <li key={key} className={styles.item}>
          <span>{key.toUpperCase()}: </span>
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
