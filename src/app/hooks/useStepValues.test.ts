import { renderHook, act } from '@testing-library/react';
import { useStepValues } from './useStepValues';

describe('useStepValues', () => {
  it('should initialize with RGB step values', () => {
    const { result } = renderHook(() => useStepValues());

    expect(result.current.step).toEqual({ r: 10, g: 10, b: 10 });
  });

  it('should reset step values for RGB color space', () => {
    const { result } = renderHook(() => useStepValues());

    act(() => {
      result.current.resetStepForColorSpace('RGB');
    });

    expect(result.current.step).toEqual({ r: 10, g: 10, b: 10 });
  });

  it('should reset step values for CMYK color space', () => {
    const { result } = renderHook(() => useStepValues());

    act(() => {
      result.current.resetStepForColorSpace('CMYK');
    });

    expect(result.current.step).toEqual({ c: 1, m: 1, y: 1, k: 1 });
  });

  it('should reset step values for HSL color space', () => {
    const { result } = renderHook(() => useStepValues());

    act(() => {
      result.current.resetStepForColorSpace('HSL');
    });

    expect(result.current.step).toEqual({ h: 10, s: 5, l: 5 });
  });

  it('should reset step values for HSV color space', () => {
    const { result } = renderHook(() => useStepValues());

    act(() => {
      result.current.resetStepForColorSpace('HSV');
    });

    expect(result.current.step).toEqual({ h: 10, s: 5, v: 5 });
  });

  it('should reset step values for HWB color space', () => {
    const { result } = renderHook(() => useStepValues());

    act(() => {
      result.current.resetStepForColorSpace('HWB');
    });

    expect(result.current.step).toEqual({ h: 10, w: 5, b: 5 });
  });

  it('should allow setting custom step values', () => {
    const { result } = renderHook(() => useStepValues());

    act(() => {
      result.current.setStep({ r: 20, g: 20, b: 20 });
    });

    expect(result.current.step).toEqual({ r: 20, g: 20, b: 20 });
  });
});
