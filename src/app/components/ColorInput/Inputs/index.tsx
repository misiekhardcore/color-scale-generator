import type { JSX } from 'react';

import type { ColorTypeMap } from '@/app/types';

import { CmykInput } from './CmykInput';
import { HexInput } from './HexInput';
import { HslInput } from './HslInput';
import { HsvInput } from './HsvInput';
import { HwbInput } from './HwbInput';
import { RalInput } from './RalInput';
import { RgbInput } from './RgbInput';
import type { InputComponentProps } from './types';

export type { InputComponentProps };

export const inputComponents: {
  [key in keyof ColorTypeMap]: (props: InputComponentProps<key>) => JSX.Element;
} = {
  RGB: RgbInput,
  CMYK: CmykInput,
  HSV: HsvInput,
  HEX: HexInput,
  HSL: HslInput,
  HWB: HwbInput,
  RAL: RalInput,
};
