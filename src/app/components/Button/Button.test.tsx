import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
    expect(screen.getByRole('button')).toHaveClass('hover:bg-blue-700');
    expect(screen.getByRole('button')).toHaveTextContent('click me');
  });

  it('should handle click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>click me</Button>);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('should render with variant', () => {
    render(<Button variant="secondary">click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-500');
    expect(screen.getByRole('button')).toHaveClass('hover:bg-gray-700');
  });

  it('should render with size', () => {
    render(<Button size="sm">click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');
  });
});
