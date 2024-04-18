import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

import './Button.scss';

type Variant = 'primary' | 'secondary' | 'success' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ className, size = 'md', variant = 'primary', ...props }: ButtonProps) {
  return <button className={classNames('Button', className, size, variant)} {...props} />;
}
