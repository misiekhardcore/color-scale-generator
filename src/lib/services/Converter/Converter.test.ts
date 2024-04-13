import { Converter } from './Converter';

describe('From RGB', () => {
  const testRgb = {
    r: 127,
    g: 127,
    b: 127,
  };

  it('should convert RGB to RGB', () => {
    const result = Converter.convert('RGB', 'RGB', testRgb);
    expect(result).toEqual(testRgb);
  });

  it('should convert RGB to CMYK', () => {
    const result = Converter.convert('RGB', 'CMYK', testRgb);
    expect(result).toEqual({ c: 0, m: 0, y: 0, k: 0.5019607843137255 });
  });

  it('should convert RGB to HSL', () => {
    const result = Converter.convert('RGB', 'HSL', testRgb);
    expect(result).toEqual({ h: 0, s: 0, l: 0.4980392156862745 });
  });

  it('should convert RGB to HSV', () => {
    const result = Converter.convert('RGB', 'HSV', testRgb);
    expect(result).toEqual({ h: 0, s: 0, v: 0.4980392156862745 });
  });

  it('should convert RGB to HEX', () => {
    const result = Converter.convert('RGB', 'HEX', testRgb);
    expect(result).toEqual({ hex: '#7f7f7f' });
  });

  it('should convert RGB to HWB', () => {
    const result = Converter.convert('RGB', 'HWB', testRgb);
    expect(result).toEqual({ h: 0, w: 0.4980392156862745, b: 0.5019607843137255 });
  });

  it('should convert RGB to RAL', () => {
    const result = Converter.convert('RGB', 'RAL', testRgb);
    expect(result).toEqual({ ral: 7037 });
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('RGB', 'UNKNOWN', testRgb)).toThrow(
      'No converter from RGB to UNKNOWN'
    );
  });
});

describe('From CMYK', () => {
  const testCmyk = {
    c: 0,
    m: 0,
    y: 0,
    k: 0.5019607843137255,
  };

  it('should convert CMYK to RGB', () => {
    const result = Converter.convert('CMYK', 'RGB', testCmyk);
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });

  it('should convert CMYK to CMYK', () => {
    const result = Converter.convert('CMYK', 'CMYK', testCmyk);
    expect(result).toEqual(testCmyk);
  });

  it('should convert CMYK to HSL', () => {
    const result = Converter.convert('CMYK', 'HSL', testCmyk);
    expect(result).toEqual({ h: 0, s: 0, l: 0.4980392156862745 });
  });

  it('should convert CMYK to HSV', () => {
    const result = Converter.convert('CMYK', 'HSV', testCmyk);
    expect(result).toEqual({ h: 0, s: 0, v: 0.4980392156862745 });
  });

  it('should convert CMYK to HEX', () => {
    const result = Converter.convert('CMYK', 'HEX', testCmyk);
    expect(result).toEqual({ hex: '#7f7f7f' });
  });

  it('should convert CMYK to HWB', () => {
    const result = Converter.convert('CMYK', 'HWB', testCmyk);
    expect(result).toEqual({ h: 0, w: 0.4980392156862745, b: 0.5019607843137255 });
  });

  it('should convert CMYK to RAL', () => {
    const result = Converter.convert('CMYK', 'RAL', testCmyk);
    expect(result).toEqual({ ral: 7037 });
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('CMYK', 'UNKNOWN', testCmyk)).toThrow(
      'No converter from CMYK to UNKNOWN'
    );
  });
});

describe('From HSL', () => {
  const testHsl = {
    h: 0,
    s: 0,
    l: 0.4980392156862745,
  };

  it('should convert HSL to RGB', () => {
    const result = Converter.convert('HSL', 'RGB', testHsl);
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });

  it('should convert HSL to CMYK', () => {
    const result = Converter.convert('HSL', 'CMYK', testHsl);
    expect(result).toEqual({ c: 0, m: 0, y: 0, k: 0.5019607843137255 });
  });

  it('should convert HSL to HSL', () => {
    const result = Converter.convert('HSL', 'HSL', testHsl);
    expect(result).toEqual(testHsl);
  });

  it('should convert HSL to HSV', () => {
    const result = Converter.convert('HSL', 'HSV', testHsl);
    expect(result).toEqual({ h: 0, s: 0, v: 0.4980392156862745 });
  });

  it('should convert HSL to HEX', () => {
    const result = Converter.convert('HSL', 'HEX', testHsl);
    expect(result).toEqual({ hex: '#7f7f7f' });
  });

  it('should convert HSL to HWB', () => {
    const result = Converter.convert('HSL', 'HWB', testHsl);
    expect(result).toEqual({ h: 0, w: 0.4980392156862745, b: 0.5019607843137255 });
  });

  it('should convert HSL to RAL', () => {
    const result = Converter.convert('HSL', 'RAL', testHsl);
    expect(result).toEqual({ ral: 7037 });
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('HSL', 'UNKNOWN', testHsl)).toThrow(
      'No converter from HSL to UNKNOWN'
    );
  });
});

describe('From HSV', () => {
  const testHsv = {
    h: 0,
    s: 0,
    v: 0.4980392156862745,
  };

  it('should convert HSV to RGB', () => {
    const result = Converter.convert('HSV', 'RGB', testHsv);
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });

  it('should convert HSV to CMYK', () => {
    const result = Converter.convert('HSV', 'CMYK', testHsv);
    expect(result).toEqual({ c: 0, m: 0, y: 0, k: 0.5019607843137255 });
  });

  it('should convert HSV to HSL', () => {
    const result = Converter.convert('HSV', 'HSL', testHsv);
    expect(result).toEqual({ h: 0, s: 0, l: 0.4980392156862745 });
  });

  it('should convert HSV to HSV', () => {
    const result = Converter.convert('HSV', 'HSV', testHsv);
    expect(result).toEqual(testHsv);
  });

  it('should convert HSV to HEX', () => {
    const result = Converter.convert('HSV', 'HEX', testHsv);
    expect(result).toEqual({ hex: '#7f7f7f' });
  });

  it('should convert HSV to HWB', () => {
    const result = Converter.convert('HSV', 'HWB', testHsv);
    expect(result).toEqual({ h: 0, w: 0.4980392156862745, b: 0.5019607843137255 });
  });

  it('should convert HSV to RAL', () => {
    const result = Converter.convert('HSV', 'RAL', testHsv);
    expect(result).toEqual({ ral: 7037 });
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('HSV', 'UNKNOWN', testHsv)).toThrow(
      'No converter from HSV to UNKNOWN'
    );
  });
});

describe('From HEX', () => {
  const testHex = {
    hex: '#7f7f7f',
  };

  it('should convert HEX to RGB', () => {
    const result = Converter.convert('HEX', 'RGB', testHex);
    expect(result).toEqual({ r: 127, g: 127, b: 127 });
  });

  it('should convert HEX to CMYK', () => {
    const result = Converter.convert('HEX', 'CMYK', testHex);
    expect(result).toEqual({ c: 0, m: 0, y: 0, k: 0.5019607843137255 });
  });

  it('should convert HEX to HSL', () => {
    const result = Converter.convert('HEX', 'HSL', testHex);
    expect(result).toEqual({ h: 0, s: 0, l: 0.4980392156862745 });
  });

  it('should convert HEX to HSV', () => {
    const result = Converter.convert('HEX', 'HSV', testHex);
    expect(result).toEqual({ h: 0, s: 0, v: 0.4980392156862745 });
  });

  it('should convert HEX to HEX', () => {
    const result = Converter.convert('HEX', 'HEX', testHex);
    expect(result).toEqual(testHex);
  });

  it('should convert HEX to HWB', () => {
    const result = Converter.convert('HEX', 'HWB', testHex);
    expect(result).toEqual({ h: 0, w: 0.4980392156862745, b: 0.5019607843137255 });
  });

  it('should convert HEX to RAL', () => {
    const result = Converter.convert('HEX', 'RAL', testHex);
    expect(result).toEqual({ ral: 7037 });
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('HEX', 'UNKNOWN', testHex)).toThrow(
      'No converter from HEX to UNKNOWN'
    );
  });
});

describe('From HWB', () => {
  const testHwb = {
    h: 0,
    w: 0.5,
    b: 0.5,
  };

  it('should convert HWB to RGB', () => {
    const result = Converter.convert('HWB', 'RGB', testHwb);
    expect(result).toEqual({ r: 127.5, g: 127.5, b: 127.5 });
  });

  it('should convert HWB to CMYK', () => {
    const result = Converter.convert('HWB', 'CMYK', testHwb);
    expect(result).toEqual({ c: 0, m: 0, y: 0, k: 0.5 });
  });

  it('should convert HWB to HSL', () => {
    const result = Converter.convert('HWB', 'HSL', testHwb);
    expect(result).toEqual({ h: 0, s: 0, l: 0.5 });
  });

  it('should convert HWB to HSV', () => {
    const result = Converter.convert('HWB', 'HSV', testHwb);
    expect(result).toEqual({ h: 0, s: 0, v: 0.5 });
  });

  it('should convert HWB to HEX', () => {
    const result = Converter.convert('HWB', 'HEX', testHwb);
    expect(result).toEqual({ hex: '#808080' });
  });

  it('should convert HWB to HWB', () => {
    const result = Converter.convert('HWB', 'HWB', testHwb);
    expect(result).toEqual(testHwb);
  });

  it('should convert HWB to RAL', () => {
    const result = Converter.convert('HWB', 'RAL', testHwb);
    expect(result).toEqual({ ral: 9022 });
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('HWB', 'UNKNOWN', testHwb)).toThrow(
      'No converter from HWB to UNKNOWN'
    );
  });
});

describe('From RAL', () => {
  const testRal = {
    ral: 7037,
  };

  it('should convert RAL to RGB', () => {
    const result = Converter.convert('RAL', 'RGB', testRal);
    expect(result).toEqual({ r: 122, g: 123, b: 122 });
  });

  it('should convert RAL to CMYK', () => {
    const result = Converter.convert('RAL', 'CMYK', testRal);
    expect(result).toEqual({
      c: 0.008130081300812978,
      m: 0,
      y: 0.008130081300812978,
      k: 0.5176470588235293,
    });
  });

  it('should convert RAL to HSL', () => {
    const result = Converter.convert('RAL', 'HSL', testRal);
    expect(result).toEqual({ h: 120, s: 0.00408163265306121, l: 0.4803921568627451 });
  });

  it('should convert RAL to HSV', () => {
    const result = Converter.convert('RAL', 'HSV', testRal);
    expect(result).toEqual({ h: 120, s: 0.00813008130081298, v: 0.4823529411764706 });
  });

  it('should convert RAL to HEX', () => {
    const result = Converter.convert('RAL', 'HEX', testRal);
    expect(result).toEqual({ hex: '#7a7b7a' });
  });

  it('should convert RAL to HWB', () => {
    const result = Converter.convert('RAL', 'HWB', testRal);
    expect(result).toEqual({ h: 120, w: 0.47843137254901963, b: 0.5176470588235293 });
  });

  it('should convert RAL to RAL', () => {
    const result = Converter.convert('RAL', 'RAL', testRal);
    expect(result).toEqual(testRal);
  });

  it('should throw an error', () => {
    // @ts-expect-error Testing invalid input
    expect(() => Converter.convert('RAL', 'UNKNOWN', testRal)).toThrow(
      'No converter from RAL to UNKNOWN'
    );
  });
});
