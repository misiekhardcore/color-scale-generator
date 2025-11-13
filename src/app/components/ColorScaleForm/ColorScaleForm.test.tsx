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
    outputColorSpace: 'RAL' as const,
    onOutputColorSpaceChange: jest.fn(),
    resultsColorSpace: 'RGB' as const,
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
    onExportClick: jest.fn(),
  };

  it('should render export button', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByText('Export scale')).toBeInTheDocument();
  });

  it('should render scale mode selector', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByLabelText('Scale mode')).toBeInTheDocument();
  });

  it('should render color inputs for two-color mode', () => {
    render(<ColorScaleForm {...defaultProps} />);

    const colorInputs = screen.getAllByLabelText('Color');
    expect(colorInputs).toHaveLength(2);
  });

  it('should render only one color input for step mode', () => {
    render(<ColorScaleForm {...defaultProps} scaleMode="step" />);

    const colorInputs = screen.getAllByLabelText('Color');
    expect(colorInputs).toHaveLength(1);
  });

  it('should render step inputs in step mode', () => {
    render(<ColorScaleForm {...defaultProps} scaleMode="step" />);

    expect(screen.getByText(/Step values/)).toBeInTheDocument();
  });

  it('should not render step inputs in two-color mode', () => {
    render(<ColorScaleForm {...defaultProps} scaleMode="two-color" />);

    expect(screen.queryByText(/Step values/)).not.toBeInTheDocument();
  });

  it('should render colors in scale input', () => {
    render(<ColorScaleForm {...defaultProps} />);

    expect(screen.getByLabelText('Colors in scale')).toBeInTheDocument();
  });
});
