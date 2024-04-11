import { ColorTypeMap } from '@/app/types';

export interface InputComponentProps<T extends keyof ColorTypeMap> {
  value: ColorTypeMap[T];
  onChange: (value: ColorTypeMap[T]) => void;
}
