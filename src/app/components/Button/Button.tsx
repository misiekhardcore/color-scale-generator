import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './Button.module.scss';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className={styles.Button} {...props} />;
}
