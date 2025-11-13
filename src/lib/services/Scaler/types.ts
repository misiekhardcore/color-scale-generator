import { ColorTypeMap } from '@/app/types';

export type ScalerKey<P extends string> = `getScale${Capitalize<Lowercase<string & P>>}`;

export type Scalers = {
  [Key in keyof ColorTypeMap as ScalerKey<string & Key>]: (
    startColor: ColorTypeMap[Key],
    endColor: ColorTypeMap[Key],
    colorsNumber: number
  ) => ColorTypeMap[Key][];
};

// Step-based scaler types
export type StepScalerKey<P extends string> =
  `getScaleFromStep${Capitalize<Lowercase<string & P>>}`;

export type StepScalers = {
  [Key in keyof ColorTypeMap as StepScalerKey<string & Key>]: (
    startColor: ColorTypeMap[Key],
    step: Partial<Record<keyof ColorTypeMap[Key], number>>,
    colorsNumber: number
  ) => ColorTypeMap[Key][];
};
