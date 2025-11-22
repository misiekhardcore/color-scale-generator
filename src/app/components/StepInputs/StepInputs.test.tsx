import { fireEvent, render, screen } from '@testing-library/react';

import { StepInputs } from './StepInputs';

describe('StepInputs', () => {
  it('should render RGB step inputs for RGB color space', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="RGB" step={{ r: 10, g: 10, b: 10 }} onStepChange={onStepChange} />
    );

    expect(screen.getByLabelText('Step R')).toBeInTheDocument();
    expect(screen.getByLabelText('Step G')).toBeInTheDocument();
    expect(screen.getByLabelText('Step B')).toBeInTheDocument();
  });

  it('should render RGB step inputs for HEX color space', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="HEX" step={{ r: 10, g: 10, b: 10 }} onStepChange={onStepChange} />
    );

    expect(screen.getByLabelText('Step R')).toBeInTheDocument();
    expect(screen.getByLabelText('Step G')).toBeInTheDocument();
    expect(screen.getByLabelText('Step B')).toBeInTheDocument();
  });

  it('should render CMYK step inputs for CMYK color space', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="CMYK" step={{ c: 1, m: 1, y: 1, k: 1 }} onStepChange={onStepChange} />
    );

    expect(screen.getByLabelText('Step C')).toBeInTheDocument();
    expect(screen.getByLabelText('Step M')).toBeInTheDocument();
    expect(screen.getByLabelText('Step Y')).toBeInTheDocument();
    expect(screen.getByLabelText('Step K')).toBeInTheDocument();
  });

  it('should render HSL step inputs for HSL color space', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="HSL" step={{ h: 10, s: 5, l: 5 }} onStepChange={onStepChange} />
    );

    expect(screen.getByLabelText('Step H')).toBeInTheDocument();
    expect(screen.getByLabelText('Step S')).toBeInTheDocument();
    expect(screen.getByLabelText('Step L')).toBeInTheDocument();
  });

  it('should render HSV step inputs for HSV color space', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="HSV" step={{ h: 10, s: 5, v: 5 }} onStepChange={onStepChange} />
    );

    expect(screen.getByLabelText('Step H')).toBeInTheDocument();
    expect(screen.getByLabelText('Step S')).toBeInTheDocument();
    expect(screen.getByLabelText('Step V')).toBeInTheDocument();
  });

  it('should render HWB step inputs for HWB color space', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="HWB" step={{ h: 10, w: 5, b: 5 }} onStepChange={onStepChange} />
    );

    expect(screen.getByLabelText('Step H')).toBeInTheDocument();
    expect(screen.getByLabelText('Step W')).toBeInTheDocument();
    expect(screen.getByLabelText('Step B')).toBeInTheDocument();
  });

  it('should call onStepChange when RGB step value changes', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="RGB" step={{ r: 10, g: 10, b: 10 }} onStepChange={onStepChange} />
    );

    fireEvent.change(screen.getByLabelText('Step R'), { target: { value: '20' } });
    expect(onStepChange).toHaveBeenCalledWith({ r: 20, g: 10, b: 10 });
  });

  it('should call onStepChange when CMYK step value changes', () => {
    const onStepChange = jest.fn();
    render(
      <StepInputs colorSpace="CMYK" step={{ c: 1, m: 1, y: 1, k: 1 }} onStepChange={onStepChange} />
    );

    fireEvent.change(screen.getByLabelText('Step C'), { target: { value: '5' } });
    expect(onStepChange).toHaveBeenCalledWith({ c: 5, m: 1, y: 1, k: 1 });
  });
});
