import { Validator } from './Validator';

describe('Validator', () => {
  it('should get a validator', () => {
    const validator = Validator.getValidator('RGB');
    expect(validator).toBeDefined();
  });

  it('should throw an error if validator not found', () => {
    expect(() => Validator.getValidator('HEX')).toThrowError('No validator validateHex found');
  });

  it('should validate a color', () => {
    const color = { r: 0, g: 0, b: 0 };
    const valid = Validator.validate('RGB', color);
    expect(valid).toBe(true);
  });

  it('should throw an error if color is invalid', () => {
    const color = { r: 0, g: 0, b: 256 };
    expect(() => Validator.validate('RGB', color)).toThrowError('Invalid color');
  });
});
