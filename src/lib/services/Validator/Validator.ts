import { ColorTypeMap } from '@/app/types';
import { capitalize } from '@/lib/helpers';

import { Validators } from './types';
import { validators } from './validators';

export class Validator {
  static getValidator<T extends keyof ColorTypeMap>(type: T) {
    const key = this.getValidatorKey(type);
    if (!validators[key]) {
      throw new Error(`No validator ${key} found`);
    }
    return validators[key] as (color: ColorTypeMap[T]) => boolean;
  }

  static validate<T extends keyof ColorTypeMap>(type: T, color: ColorTypeMap[T]) {
    const v = Validator.getValidator(type);
    return v(color);
  }

  private static getValidatorKey<T extends keyof ColorTypeMap>(type: T) {
    return `validate${capitalize(type)}` as keyof Validators;
  }
}
