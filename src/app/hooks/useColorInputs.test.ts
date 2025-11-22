import { renderHook, act } from '@testing-library/react';
import { useColorInputs } from './useColorInputs';

describe('useColorInputs', () => {
  it('should initialize with default RGB color space', () => {
    const { result } = renderHook(() => useColorInputs());

    expect(result.current.inputColorSpace).toBe('RGB');
    expect(result.current.inputColorStart).toEqual({ r: 255, g: 0, b: 0 });
    expect(result.current.inputColorEnd).toEqual({ r: 0, g: 255, b: 0 });
  });

  it('should provide hex representations of colors', () => {
    const { result } = renderHook(() => useColorInputs());

    expect(result.current.hexInputColorStart.hex).toBe('#ff0000');
    expect(result.current.hexInputColorEnd.hex).toBe('#00ff00');
  });

  it('should change input color space and convert colors', () => {
    const { result } = renderHook(() => useColorInputs());

    act(() => {
      result.current.changeInputColorSpace('HSL');
    });

    expect(result.current.inputColorSpace).toBe('HSL');
    // Red (255, 0, 0) in HSL is (0, 100, 50)
    expect(result.current.inputColorStart).toHaveProperty('h');
    expect(result.current.inputColorStart).toHaveProperty('s');
    expect(result.current.inputColorStart).toHaveProperty('l');
  });

  it('should handle color input start change from hex', () => {
    const { result } = renderHook(() => useColorInputs());

    act(() => {
      result.current.handleColorInputStartChange('#0000ff');
    });

    expect(result.current.inputColorStart).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('should handle color input end change from hex', () => {
    const { result } = renderHook(() => useColorInputs());

    act(() => {
      result.current.handleColorInputEndChange('#ffff00');
    });

    expect(result.current.inputColorEnd).toEqual({ r: 255, g: 255, b: 0 });
  });
});
