import { ColorTypeMap } from '@/app/types';

import type { InputComponentProps } from './types';

import { RgbInput } from './RgbInput';
import { HexInput } from './HexInput';
import { CmykInput } from './CmykInput';
import { HslInput } from './HslInput';
import { HsvInput } from './HsvInput';
import { HwbInput } from './HwbInput';
import { RalInput } from './RalInput';

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
