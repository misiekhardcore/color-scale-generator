import { ColorTypeMap } from '@/app/types';

export type StringifierKey<P extends string> = `${Lowercase<string & P>}ToString`;

export type Stringifiers = {
  [Key in keyof ColorTypeMap as StringifierKey<string & Key>]: (color: ColorTypeMap[Key]) => string;
};
