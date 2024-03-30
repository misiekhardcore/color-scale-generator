import { render, screen } from '@testing-library/react';

import { ColorOutput } from './ColorOutput';

describe('ColorOutput', () => {
  it('should render properly', () => {
    render(<ColorOutput value={{ r: 127, g: 127, b: 127 }} from="RGB" to="HSL" />);
    expect(screen.getByText('H:')).toBeInTheDocument();
    expect(screen.getByText('S:')).toBeInTheDocument();
    expect(screen.getByText('L:')).toBeInTheDocument();
    expect(screen.getAllByText('0').length).toBe(2);
    expect(screen.getByText('0.498')).toBeInTheDocument();

    render(<ColorOutput value={{ r: 127, g: 127, b: 127 }} from="RGB" to="HEX" />);
    expect(screen.getByText('HEX:')).toBeInTheDocument();
    expect(screen.getByText('#7F7F7F')).toBeInTheDocument();
  });

  it('should render properly with different values', () => {
    render(<ColorOutput value={{ r: 255, g: 0, b: 0 }} from="RGB" to="HSL" />);
    expect(screen.getByText('H:')).toBeInTheDocument();
    expect(screen.getByText('S:')).toBeInTheDocument();
    expect(screen.getByText('L:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('0.5')).toBeInTheDocument();

    render(<ColorOutput value={{ r: 0, g: 255, b: 0 }} from="RGB" to="HEX" />);
    expect(screen.getByText('HEX:')).toBeInTheDocument();
    expect(screen.getByText('#00FF00')).toBeInTheDocument();
  });
});
