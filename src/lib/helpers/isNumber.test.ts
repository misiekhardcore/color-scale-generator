import { isNumber } from './isNumber';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber('123')).toBe(true);
  });

  it('should return false for non-numbers', () => {
    expect(isNumber('abc')).toBe(false);
  });
});
