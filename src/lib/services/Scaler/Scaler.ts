import { ColorTypeMap } from '@/app/types';
import { capitalize } from '@/lib/helpers';

import { Converter } from '../Converter';

import { Scalers } from './types';
import { scalers } from './scalers';

export class Scaler {
  static getScaler<T extends keyof ColorTypeMap>(type: T) {
    const key = this.getScalerKey(type);
    if (!scalers[key]) {
      throw new Error(`No scaler ${key} found`);
    }
    return scalers[key] as unknown as (
      startColor: ColorTypeMap[T],
      endColor: ColorTypeMap[T],
      colorsNumber: number
    ) => ColorTypeMap[T][];
  }

  private static getScalerKey<T extends keyof ColorTypeMap>(type: T) {
    return `getScale${capitalize(type)}` as keyof Scalers;
  }

  static getScale<T extends keyof ColorTypeMap>(
    from: T,
    to: T,
    startColor: ColorTypeMap[T],
    endColor: ColorTypeMap[T],
    colorsNumber: number
  ) {
    const s = Scaler.getScaler(to);
    const c = Converter.getConverter(from, to);
    return s(c(startColor), c(endColor), colorsNumber);
  }
}
