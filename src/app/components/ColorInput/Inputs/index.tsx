import { ColorTypeMap } from '@/app/types';

import type { InputComponentProps } from './types';

import { InputRgb } from './RgbInput';
import { HexInput } from './HexInput';
import { CmykInput } from './CmykInput';
import { HslInput } from './HslInput';
import { HsvInput } from './HsvInput';

export type { InputComponentProps };

export const inputComponents: {
  [key in keyof ColorTypeMap]: (props: InputComponentProps<key>) => JSX.Element;
} = {
  RGB: InputRgb,
  CMYK: CmykInput,
  HSV: HsvInput,
  HEX: HexInput,
  HSL: HslInput,
};
