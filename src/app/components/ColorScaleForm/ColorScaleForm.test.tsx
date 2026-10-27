import { render, screen } from '@testing-library/react';

import { ColorScaleForm } from './ColorScaleForm';

describe('ColorScaleForm', () => {
  const defaultProps = {
    scaleMode: 'two-color' as const,
    onScaleModeChange: jest.fn(),
    colorsNumber: 10,
    onColorsNumberChange: jest.fn(),
    inputColorSpace: 'RGB' as const,
    onInputColorSpaceChange: jest.fn(),
    previewColorSpace: 'RAL' as const,
    onPreviewColorSpaceChange: jest.fn(),
    resultsColorSpace: 'RGB' as const,
    onResultsColorSpaceChange: jest.fn(),
    inputColorStart: { r: 255, g: 0, b: 0 },
    onInputColorStartChange: jest.fn(),
    inputColorEnd: { r: 0, g: 255, b: 0 },
    onInputColorEndChange: jest.fn(),
    hexInputColorStart: { hex: '#ff0000' },
    hexInputColorEnd: { hex: '#00ff00' },
    onHexInputColorStartChange: jest.fn(),
    onHexInputColorEndChange: jest.fn(),
    step: { r: 10, g: 10, b: 10 },
    onStepChange: jest.fn(),
  };

  it('should render the three form sections', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Scale mode' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Input colors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Scale settings' })).toBeInTheDocument();
  });

  it('should render both color fields in two-color mode', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByText('Start color')).toBeInTheDocument();
    expect(screen.getByText('End color')).toBeInTheDocument();
    expect(screen.getByLabelText('Start color picker')).toHaveValue('#ff0000');
    expect(screen.getByLabelText('End color picker')).toHaveValue('#00ff00');
  });

  it('should render only one color field in step mode', () => {
    render(<ColorScaleForm {...defaultProps} scaleMode="step" />);

    expect(screen.getByText('Start color')).toBeInTheDocument();
    expect(screen.queryByText('End color')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Start color picker')).toBeInTheDocument();
  });

  it('should render step inputs only in step mode', () => {
    const { rerender } = render(<ColorScaleForm {...defaultProps} />);
    expect(screen.queryByText('Step values')).not.toBeInTheDocument();

    rerender(<ColorScaleForm {...defaultProps} scaleMode="step" />);
    expect(screen.getByText('Step values')).toBeInTheDocument();
    expect(screen.getByLabelText('Step R')).toBeInTheDocument();
    expect(screen.getByLabelText('Step G')).toBeInTheDocument();
    expect(screen.getByLabelText('Step B')).toBeInTheDocument();
  });

  it('should render the color count control', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByLabelText('Colors in scale')).toHaveValue(10);
  });

  it('should render the color space controls', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByText('Enter colors as')).toBeInTheDocument();
    expect(screen.getByText('Show values as')).toBeInTheDocument();
    expect(screen.getByText('Interpolate in')).toBeInTheDocument();
  });
});
