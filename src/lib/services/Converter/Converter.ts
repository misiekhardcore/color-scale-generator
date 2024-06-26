import { ColorTypeMap } from '@/app/types';
import { capitalize } from '@/lib/helpers';

import { converters } from './converters';
import { Converters } from './types';

export class Converter {
  static getConverter<T extends keyof ColorTypeMap, P extends keyof ColorTypeMap>(from: T, to: P) {
    const key = this.getConverterKey(from, to);
    if (!converters[key]) {
      throw new Error(`No converter from ${from} to ${to}`);
    }
    return converters[key] as unknown as (color: ColorTypeMap[T]) => ColorTypeMap[P];
  }

  static convert<T extends keyof ColorTypeMap, P extends keyof ColorTypeMap>(
    from: T,
    to: P,
    color: ColorTypeMap[T]
  ) {
    const c = Converter.getConverter(from, to);
    return c(color);
  }

  private static getConverterKey<T extends keyof ColorTypeMap, P extends keyof ColorTypeMap>(
    from: T,
    to: P
  ) {
    return `${from.toLowerCase()}To${capitalize(to)}` as keyof Converters;
  }
}
