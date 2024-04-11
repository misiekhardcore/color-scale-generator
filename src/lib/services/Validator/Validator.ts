import { ColorTypeMap } from '@/app/types';
import { Validators } from './types';
import { validators } from './validators';

export class Validator {
  static getValidator<T extends keyof ColorTypeMap>(type: T) {
    const key = this.getConverterKey(type);
    if (!validators[key]) {
      throw new Error(`No validator for ${type}`);
    }
    return validators[key] as unknown as (color: ColorTypeMap[T]) => boolean;
  }

  static validate<T extends keyof ColorTypeMap>(type: T, color: ColorTypeMap[T]) {
    const v = Validator.getValidator(type);
    return v(color);
  }

  private static getConverterKey<T extends keyof ColorTypeMap>(type: T) {
    return `validate${this.capitalize(type)}` as keyof Validators;
  }

  private static capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}
