import { Exporter } from './Exporter';

describe('Exporter', () => {
  it('should get exporter', () => {
    const exporter = Exporter.getExporter('exportCssHex');
    expect(exporter('HEX', [{ hex: '#123123' }])).toEqual(['--color-1: #123123;']);
  });

  it('should export hex to css', () => {
    const result = Exporter.export('HEX', 'exportCssHex', [{ hex: '#123123' }, { hex: '#321312' }]);
    expect(result).toEqual(['--color-1: #123123;', '--color-2: #321312;']);
  });

  it('should export rgb to hex css', () => {
    const result = Exporter.export('RGB', 'exportCssHex', [
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
    ]);
    expect(result).toEqual(['--color-1: #000000;', '--color-2: #FFFFFF;']);
  });

  it('should export rgb to css', () => {
    const result = Exporter.export('RGB', 'exportCssRgb', [
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
    ]);
    expect(result).toEqual(['--color-1: rgb(0, 0, 0);', '--color-2: rgb(255, 255, 255);']);
  });

  it('should export hex to sass', () => {
    const result = Exporter.export('HEX', 'exportSassHex', [
      { hex: '#123123' },
      { hex: '#321312' },
    ]);
    expect(result).toEqual(['$color-1: #123123;', '$color-2: #321312;']);
  });

  it('should export rgb to sass', () => {
    const result = Exporter.export('RGB', 'exportSassRgb', [
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
    ]);
    expect(result).toEqual(['$color-1: rgb(0, 0, 0);', '$color-2: rgb(255, 255, 255);']);
  });

  it('should throw error if exporter not found', () => {
    // @ts-expect-error unknown exporter
    expect(() => Exporter.getExporter('exportUnknown')).toThrow('No exporter exportUnknown found');
  });
});
