import { ColorTypeMap } from '@/app/types';
import { FilterPropertiesByKey, UnionToIntersection } from '@/lib/types';

export type ConverterKey<
  T extends string,
  P extends string,
> = `${Lowercase<string & T>}To${Capitalize<Lowercase<string & P>>}`;

export type ConvertersUnion = {
  [Key in keyof ColorTypeMap]: {
    [SubKey in keyof ColorTypeMap as ConverterKey<string & Key, string & SubKey>]: (
      color: ColorTypeMap[Key]
    ) => ColorTypeMap[SubKey];
  };
}[keyof ColorTypeMap];

export type Converters = UnionToIntersection<ConvertersUnion>;

export type ConvertersToRGB = FilterPropertiesByKey<Converters, 'ToRgb'>;

export type ConvertersFromRGB = FilterPropertiesByKey<Converters, 'rgbTo'>;
