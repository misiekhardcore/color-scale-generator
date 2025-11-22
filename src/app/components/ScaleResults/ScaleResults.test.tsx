import { render, screen } from '@testing-library/react';

import { ScaleResults } from './ScaleResults';

describe('ScaleResults', () => {
  it('should render color scale calculation space selector', () => {
    const scale = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
    ];
    const onColorSpaceChange = jest.fn();

    render(<ScaleResults scale={scale} colorSpace="RGB" onColorSpaceChange={onColorSpaceChange} />);

    expect(screen.getByLabelText('Color scale calculation space')).toBeInTheDocument();
  });

  it('should render all color outputs', () => {
    const scale = [
      { r: 255, g: 0, b: 0 },
      { r: 127, g: 127, b: 0 },
      { r: 0, g: 255, b: 0 },
    ];
    const onColorSpaceChange = jest.fn();

    render(<ScaleResults scale={scale} colorSpace="RGB" onColorSpaceChange={onColorSpaceChange} />);

    const colorOutputs = screen.getAllByRole('list');
    expect(colorOutputs.length).toBeGreaterThanOrEqual(3);
  });
});
