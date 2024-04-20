import { ColorTypeMap } from '@/app/types';
import { Stringifiers } from './types';
import { stringifiers } from './stringifiers';

export class Stringifier {
  static stringify<T extends keyof ColorTypeMap>(from: T, color: ColorTypeMap[T]): string {
    const stringifier = this.getStrigifier(from);
    return stringifier(color);
  }

  static getStrigifier<T extends keyof ColorTypeMap>(type: T) {
    const key = this.getStringifierKey(type);
    if (!stringifiers[key]) {
      throw new Error(`No stringifier ${key} found`);
    }
    return stringifiers[key] as (color: ColorTypeMap[T]) => string;
  }

  private static getStringifierKey<T extends keyof ColorTypeMap>(type: T) {
    return `${type.toLowerCase()}ToString` as keyof Stringifiers;
  }
}
