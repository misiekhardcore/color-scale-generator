import { ColorTypeMap } from '@/app/types';
import { capitalize } from '@/lib/helpers';

import { Converter } from '../Converter';

import { Scalers, StepScalers } from './types';
import { scalers, stepScalers } from './scalers';

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

  static getStepScaler<T extends keyof ColorTypeMap>(type: T) {
    const key = this.getStepScalerKey(type);
    if (!stepScalers[key]) {
      throw new Error(`No step scaler ${key} found`);
    }
    return stepScalers[key] as unknown as (
      startColor: ColorTypeMap[T],
      step: Partial<Record<keyof ColorTypeMap[T], number>>,
      colorsNumber: number
    ) => ColorTypeMap[T][];
  }

  private static getStepScalerKey<T extends keyof ColorTypeMap>(type: T) {
    return `getScaleFromStep${capitalize(type)}` as keyof StepScalers;
  }

  static getScaleFromStep<T extends keyof ColorTypeMap>(
    from: T,
    to: T,
    startColor: ColorTypeMap[T],
    step: Partial<Record<keyof ColorTypeMap[T], number>>,
    colorsNumber: number
  ) {
    const s = Scaler.getStepScaler(to);
    const c = Converter.getConverter(from, to);
    const convertedColor = c(startColor);

    // Step is expected in the target color space format
    // For HEX and RAL, step should be in RGB format
    // For other color spaces, step should match the target color space
    return s(convertedColor, step as Partial<Record<keyof ColorTypeMap[T], number>>, colorsNumber);
  }
}
