import { Stringifier } from './Stringifier';

describe('Stringifier', () => {
  it('should stringify color', () => {
    const color = { h: 0, s: 0, l: 0, a: 1 };
    const result = Stringifier.stringify('HSL', color);
    expect(result).toBe('hsl(0, 0%, 0%)');
  });

  it('should get stringifier', () => {
    const stringifier = Stringifier.getStrigifier('HSL');
    const color = { h: 0, s: 0, l: 0, a: 1 };
    const result = stringifier(color);
    expect(result).toBe('hsl(0, 0%, 0%)');
  });

  it('should stringify CMYK color', () => {
    const color = { c: 0, m: 0, y: 0, k: 0 };
    const result = Stringifier.stringify('CMYK', color);
    expect(result).toBe('cmyk(0%, 0%, 0%, 0%)');
  });

  it('should stringify HEX color', () => {
    const color = { hex: '#123123' };
    const result = Stringifier.stringify('HEX', color);
    expect(result).toBe('#123123');
  });

  it('should stringify HSL color', () => {
    const color = { h: 0, s: 0, l: 0 };
    const result = Stringifier.stringify('HSL', color);
    expect(result).toBe('hsl(0, 0%, 0%)');
  });

  it('should stringify HSV color', () => {
    const color = { h: 0, s: 0, v: 0 };
    const result = Stringifier.stringify('HSV', color);
    expect(result).toBe('hsv(0, 0%, 0%)');
  });

  it('should stringify HWB color', () => {
    const color = { h: 0, w: 0, b: 0 };
    const result = Stringifier.stringify('HWB', color);
    expect(result).toBe('hwb(0, 0%, 0%)');
  });

  it('should stringify RAL color', () => {
    const color = { ral: 0 };
    const result = Stringifier.stringify('RAL', color);
    expect(result).toBe('RAL 0');
  });

  it('should stringify RGB color', () => {
    const color = { r: 0, g: 0, b: 0 };
    const result = Stringifier.stringify('RGB', color);
    expect(result).toBe('rgb(0, 0, 0)');
  });

  it('should throw error if no stringifier found', () => {
    // @ts-expect-error unknown color type
    expect(() => Stringifier.getStrigifier('UNKNOWN')).toThrow(
      'No stringifier unknownToString found'
    );
  });
});
