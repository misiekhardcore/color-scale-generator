import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('Button');
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
    expect(screen.getByRole('button')).toHaveClass('secondary');
  });

  it('should render with size', () => {
    render(<Button size="sm">click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('sm');
  });
});
