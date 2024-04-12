import { ColorTypeMap } from '@/app/types';

export type ScalerKey<P extends string> = `getScale${Capitalize<Lowercase<string & P>>}`;

export type Scalers = {
  [Key in keyof ColorTypeMap as ScalerKey<string & Key>]: (
    startColor: ColorTypeMap[Key],
    endColor: ColorTypeMap[Key],
    colorsNumber: number
  ) => ColorTypeMap[Key][];
};
