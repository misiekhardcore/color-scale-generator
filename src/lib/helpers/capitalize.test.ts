import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should lowercase the rest of the string', () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });

  it('should capitalize the first letter of a sentence', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });
});
