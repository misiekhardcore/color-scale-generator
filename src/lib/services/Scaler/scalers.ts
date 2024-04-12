import { ColorTypeMap } from '@/app/types';
import { Scalers } from './types';
import { Converter } from '../Converter';

export const scalers: Scalers = {
  getScaleCmyk: (startColor, endColor, colorsNumber) => {
    const scale: ColorTypeMap['CMYK'][] = [];
    const diffC = (endColor.c - startColor.c) / (colorsNumber - 1);
    const diffM = (endColor.m - startColor.m) / (colorsNumber - 1);
    const diffY = (endColor.y - startColor.y) / (colorsNumber - 1);
    const diffK = (endColor.k - startColor.k) / (colorsNumber - 1);
    scale.push(startColor);
    for (let i = 1; i < colorsNumber; i++) {
      const c = startColor.c + diffC * i;
      const m = startColor.m + diffM * i;
      const y = startColor.y + diffY * i;
      const k = startColor.k + diffK * i;
      scale.push({ c, m, y, k });
    }
    return scale;
  },
  getScaleHex: (startColor, endColor, colorsNumber) => {
    const startColorRgb = Converter.convert('HEX', 'RGB', startColor);
    const endColorRgb = Converter.convert('HEX', 'RGB', endColor);
    const scaleRgb = getScaleRgb(startColorRgb, endColorRgb, colorsNumber);
    return scaleRgb.map((color) => Converter.convert('RGB', 'HEX', color));
  },
  getScaleHsl: (startColor, endColor, colorsNumber) => {
    const scale: ColorTypeMap['HSL'][] = [];
    const diffH = (endColor.h - startColor.h) / (colorsNumber - 1);
    const diffS = (endColor.s - startColor.s) / (colorsNumber - 1);
    const diffL = (endColor.l - startColor.l) / (colorsNumber - 1);
    scale.push(startColor);
    for (let i = 1; i < colorsNumber; i++) {
      const h = startColor.h + diffH * i;
      const s = startColor.s + diffS * i;
      const l = startColor.l + diffL * i;
      scale.push({ h, s, l });
    }
    return scale;
  },
  getScaleHsv: (startColor, endColor, colorsNumber) => {
    const scale: ColorTypeMap['HSV'][] = [];
    const diffH = (endColor.h - startColor.h) / (colorsNumber - 1);
    const diffS = (endColor.s - startColor.s) / (colorsNumber - 1);
    const diffV = (endColor.v - startColor.v) / (colorsNumber - 1);
    scale.push(startColor);
    for (let i = 1; i < colorsNumber; i++) {
      const h = startColor.h + diffH * i;
      const s = startColor.s + diffS * i;
      const v = startColor.v + diffV * i;
      scale.push({ h, s, v });
    }
    return scale;
  },
  getScaleRgb,
};

function getScaleRgb(
  startColor: ColorTypeMap['RGB'],
  endColor: ColorTypeMap['RGB'],
  colorsNumber: number
) {
  const scale: ColorTypeMap['RGB'][] = [];
  const diffR = (endColor.r - startColor.r) / (colorsNumber - 1);
  const diffG = (endColor.g - startColor.g) / (colorsNumber - 1);
  const diffB = (endColor.b - startColor.b) / (colorsNumber - 1);
  scale.push(startColor);
  for (let i = 1; i < colorsNumber; i++) {
    const r = startColor.r + diffR * i;
    const g = startColor.g + diffG * i;
    const b = startColor.b + diffB * i;
    scale.push({ r, g, b });
  }
  return scale;
}
