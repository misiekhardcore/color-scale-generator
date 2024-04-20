import { ColorTypeMap } from '@/app/types';

export type ExporterKey<P extends string> = `export${Capitalize<string & P>}`;

export type ExporterFunction<T extends keyof ColorTypeMap = keyof ColorTypeMap> = (
  from: T,
  scale: ColorTypeMap[T][]
) => string[];

type ExporterType =
  | Capitalize<Lowercase<keyof ColorTypeMap>>
  | 'CssHex'
  | 'CssRgb'
  | 'CssHsl'
  | 'CssHwb'
  | 'SassHex'
  | 'SassRgb'
  | 'SassHsl'
  | 'SassHwb';

export type Exporters = {
  [Key in ExporterType as ExporterKey<string & Key>]: ExporterFunction;
};
