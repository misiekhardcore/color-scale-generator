import { Validator } from './Validator';

describe('Validator', () => {
  it('should get a validator', () => {
    const validator = Validator.getValidator('RGB');
    expect(validator).toBeDefined();
  });

  it('should throw an error if validator not found', () => {
    expect(() => Validator.getValidator('HEX')).toThrow('No validator validateHex found');
  });

  it('should validate a RGB color', () => {
    const color = { r: 0, g: 0, b: 0 };
    const valid = Validator.validate('RGB', color);
    expect(valid).toBe(true);

    const color2 = { r: 255, g: 255, b: 255 };
    const valid2 = Validator.validate('RGB', color2);
    expect(valid2).toBe(true);

    const color3 = { r: 256, g: 256, b: 256 };
    const valid3 = Validator.validate('RGB', color3);
    expect(valid3).toBe(false);
  });

  it('should validate a CMYK color', () => {
    const color = { c: 0, m: 0, y: 0, k: 0 };
    const valid = Validator.validate('CMYK', color);
    expect(valid).toBe(true);

    const color2 = { c: 1, m: 1, y: 1, k: 1 };
    const valid2 = Validator.validate('CMYK', color2);
    expect(valid2).toBe(true);

    const color3 = { c: 2, m: 2, y: 2, k: 2 };
    const valid3 = Validator.validate('CMYK', color3);
    expect(valid3).toBe(false);
  });

  it('should validate a HEX color', () => {
    const color = { hex: '#000000' };
    const valid = Validator.validate('HEX', color);
    expect(valid).toBe(true);

    const color2 = { hex: '#FFFFFF' };
    const valid2 = Validator.validate('HEX', color2);
    expect(valid2).toBe(true);

    const color3 = { hex: '#FFFFFFF' };
    const valid3 = Validator.validate('HEX', color3);
    expect(valid3).toBe(false);
  });

  it('should validate a HSL color', () => {
    const color = { h: 0, s: 0, l: 0 };
    const valid = Validator.validate('HSL', color);
    expect(valid).toBe(true);

    const color2 = { h: 360, s: 1, l: 1 };
    const valid2 = Validator.validate('HSL', color2);
    expect(valid2).toBe(true);

    const color3 = { h: 361, s: 2, l: 2 };
    const valid3 = Validator.validate('HSL', color3);
    expect(valid3).toBe(false);
  });

  it('should validate a HSV color', () => {
    const color = { h: 0, s: 0, v: 0 };
    const valid = Validator.validate('HSV', color);
    expect(valid).toBe(true);

    const color2 = { h: 360, s: 1, v: 1 };
    const valid2 = Validator.validate('HSV', color2);
    expect(valid2).toBe(true);

    const color3 = { h: 361, s: 2, v: 2 };
    const valid3 = Validator.validate('HSV', color3);
    expect(valid3).toBe(false);
  });

  it('should validate a HWB color', () => {
    const color = { h: 0, w: 0, b: 0 };
    const valid = Validator.validate('HWB', color);
    expect(valid).toBe(true);

    const color2 = { h: 360, w: 1, b: 1 };
    const valid2 = Validator.validate('HWB', color2);
    expect(valid2).toBe(true);

    const color3 = { h: 361, w: 2, b: 2 };
    const valid3 = Validator.validate('HWB', color3);
    expect(valid3).toBe(false);
  });

  it('should validate a RAL color', () => {
    const color = { ral: 0 };
    const valid = Validator.validate('RAL', color);
    expect(valid).toBe(true);

    const color2 = { ral: 9999 };
    const valid2 = Validator.validate('RAL', color2);
    expect(valid2).toBe(true);

    const color3 = { ral: 10000 };
    const valid3 = Validator.validate('RAL', color3);
    expect(valid3).toBe(false);
  });

  it('should throw an error if color is invalid', () => {
    const color = { r: 0, g: 0, b: 256 };
    expect(() => Validator.validate('RGB', color)).toThrow('Invalid color');
  });
});
