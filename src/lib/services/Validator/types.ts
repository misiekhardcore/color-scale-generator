import { ColorTypeMap } from '@/app/types';

export type ValidatorKey<P extends string> = `validate${Capitalize<Lowercase<string & P>>}`;

export type Validators = {
  [Key in keyof ColorTypeMap as ValidatorKey<string & Key>]: (color: ColorTypeMap[Key]) => boolean;
};
