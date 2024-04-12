import { Scaler } from './Scaler';

describe('Scaler', () => {
  it('should get a scaler', () => {
    const scaler = Scaler.getScaler('RGB');
    expect(scaler).toBeDefined();
  });

  it('should throw an error if scaler not found', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Scaler.getScaler('UNKNOWN')).toThrowError('No scaler getScaleUnknown found');
  });

  it('should get CMYK scale', () => {
    const scale = Scaler.getScale(
      'RGB',
      'CMYK',
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      3
    );
    expect(scale).toMatchObject([
      { c: 0, m: 0, y: 0, k: 1 },
      { c: 0, m: 0, y: 0, k: 0.5 },
      { c: 0, m: 0, y: 0, k: 0 },
    ]);
  });

  it('should get RGB scale', () => {
    const scale = Scaler.getScale(
      'RGB',
      'RGB',
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      3
    );
    expect(scale).toMatchObject([
      { r: 0, g: 0, b: 0 },
      { r: 127.5, g: 127.5, b: 127.5 },
      { r: 255, g: 255, b: 255 },
    ]);
  });

  it('should get RGB scale with 1 color', () => {
    const scale = Scaler.getScale(
      'RGB',
      'RGB',
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      1
    );
    expect(scale).toMatchObject([{ r: 0, g: 0, b: 0 }]);
  });

  it('should get HEX scale', () => {
    const scale = Scaler.getScale(
      'RGB',
      'HEX',
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      3
    );
    expect(scale).toMatchObject([{ hex: '#000000' }, { hex: '#808080' }, { hex: '#ffffff' }]);
  });

  it('should get HSL scale', () => {
    const scale = Scaler.getScale(
      'RGB',
      'HSL',
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      3
    );
    expect(scale).toMatchObject([
      { h: 0, s: 0, l: 0 },
      { h: 0, s: 0, l: 0.5 },
      { h: 0, s: 0, l: 1 },
    ]);
  });

  it('should get HSV scale', () => {
    const scale = Scaler.getScale(
      'RGB',
      'HSV',
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      3
    );
    expect(scale).toMatchObject([
      { h: 0, s: 0, v: 0 },
      { h: 0, s: 0, v: 0.5 },
      { h: 0, s: 0, v: 1 },
    ]);
  });

  it('should throw an error if scaler not found', () => {
    expect(() =>
      // @ts-expect-error Testing invalid input
      Scaler.getScale('UNKNOWN', 'UNKNOWN', { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 3)
    ).toThrowError('No scaler getScaleUnknown found');
  });

  it('should throw an error if converter not found', () => {
    expect(() =>
      // @ts-expect-error Testing invalid input
      Scaler.getScale('UNKNOWN', 'RGB', { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, 3)
    ).toThrowError('No converter from UNKNOWN to RGB');
  });
});
