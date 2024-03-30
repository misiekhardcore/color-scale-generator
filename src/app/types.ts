import { COLOR_SPACES } from './constants';

export type ColorSpace = (typeof COLOR_SPACES)[number];

export type RGB = { r: number; g: number; b: number };
export type CMYK = { c: number; m: number; y: number; k: number };
export type HSL = { h: number; s: number; l: number };
export type HSV = { h: number; s: number; v: number };
export type HEX = { hex: string };
export type Color = RGB | CMYK | HSL | HSV | HEX;

export interface ColorTypeMap extends Record<ColorSpace, Color> {
  RGB: RGB;
  CMYK: CMYK;
  HSL: HSL;
  HSV: HSV;
  HEX: HEX;
}
