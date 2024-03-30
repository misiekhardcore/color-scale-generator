import { isNumber } from '@/lib/helpers';

import styles from './Selector.module.scss';

type Value = string | number | undefined;

type SelectorProps<T extends Value> = {
  label: string;
  items: readonly T[];
  selected: T;
  onChange: (value: T) => void;
};

export function Selector<T extends Value>({ items, selected, onChange, label }: SelectorProps<T>) {
  return (
    <label className={styles.Selector}>
      {label}
      <select
        value={selected}
        onChange={({ target: { value } }) => onChange((isNumber(value) ? +value : value) as T)}
      >
        {items.map((item) => (
          <option key={`${item}`} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
