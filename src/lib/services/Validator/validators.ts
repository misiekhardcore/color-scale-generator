import { Validators } from './types';

export const validators: Validators = {
  validateCmyk: ({ c, m, y, k }) => {
    return c >= 0 && c <= 1 && m >= 0 && m <= 1 && y >= 0 && y <= 1 && k >= 0 && k <= 1;
  },
  validateHex: ({ hex }) => {
    return /^#[0-9A-F]{0,6}$/i.test(hex);
  },
  validateHsl: ({ h, s, l }) => {
    return h >= 0 && h < 360 && s >= 0 && s <= 1 && l >= 0 && l <= 1;
  },
  validateHsv: ({ h, s, v }) => {
    return h >= 0 && h < 360 && s >= 0 && s <= 1 && v >= 0 && v <= 1;
  },
  validateRgb: ({ r, g, b }) => {
    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
  },
  validateHwb: ({ h, w, b }) => {
    return h >= 0 && h < 360 && w >= 0 && w <= 1 && b >= 0 && b <= 1;
  },
  validateRal: ({ ral }) => {
    return ral >= 0 && ral <= 9999;
  },
};
