import { ColorTypeMap } from '@/app/types';
import { Scalers, StepScalers } from './types';
import { Converter } from '../Converter';

// Helper function to generate scale from start color and step for RGB
function generateScaleFromStepRgb(
  startColor: ColorTypeMap['RGB'],
  step: { r: number; g: number; b: number },
  colorsNumber: number
): ColorTypeMap['RGB'][] {
  const scale: ColorTypeMap['RGB'][] = [startColor];
  for (let i = 1; i < colorsNumber; i++) {
    const r = startColor.r + step.r * i;
    const g = startColor.g + step.g * i;
    const b = startColor.b + step.b * i;
    scale.push({ r, g, b });
  }
  return scale;
}

// Helper function to generate scale from start color and step for CMYK
function generateScaleFromStepCmyk(
  startColor: ColorTypeMap['CMYK'],
  step: { c: number; m: number; y: number; k: number },
  colorsNumber: number
): ColorTypeMap['CMYK'][] {
  const scale: ColorTypeMap['CMYK'][] = [startColor];
  for (let i = 1; i < colorsNumber; i++) {
    const c = startColor.c + step.c * i;
    const m = startColor.m + step.m * i;
    const y = startColor.y + step.y * i;
    const k = startColor.k + step.k * i;
    scale.push({ c, m, y, k });
  }
  return scale;
}

// Helper function to generate scale from start color and step for HSL
function generateScaleFromStepHsl(
  startColor: ColorTypeMap['HSL'],
  step: { h: number; s: number; l: number },
  colorsNumber: number
): ColorTypeMap['HSL'][] {
  const scale: ColorTypeMap['HSL'][] = [startColor];
  for (let i = 1; i < colorsNumber; i++) {
    const h = startColor.h + step.h * i;
    const s = startColor.s + step.s * i;
    const l = startColor.l + step.l * i;
    scale.push({ h, s, l });
  }
  return scale;
}

// Helper function to generate scale from start color and step for HSV
function generateScaleFromStepHsv(
  startColor: ColorTypeMap['HSV'],
  step: { h: number; s: number; v: number },
  colorsNumber: number
): ColorTypeMap['HSV'][] {
  const scale: ColorTypeMap['HSV'][] = [startColor];
  for (let i = 1; i < colorsNumber; i++) {
    const h = startColor.h + step.h * i;
    const s = startColor.s + step.s * i;
    const v = startColor.v + step.v * i;
    scale.push({ h, s, v });
  }
  return scale;
}

// Helper function to generate scale from start color and step for HWB
function generateScaleFromStepHwb(
  startColor: ColorTypeMap['HWB'],
  step: { h: number; w: number; b: number },
  colorsNumber: number
): ColorTypeMap['HWB'][] {
  const scale: ColorTypeMap['HWB'][] = [startColor];
  for (let i = 1; i < colorsNumber; i++) {
    const h = startColor.h + step.h * i;
    const w = startColor.w + step.w * i;
    const b = startColor.b + step.b * i;
    scale.push({ h, w, b });
  }
  return scale;
}

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
  getScaleHwb: (startColor, endColor, colorsNumber) => {
    const scale: ColorTypeMap['HWB'][] = [];
    const diffH = (endColor.h - startColor.h) / (colorsNumber - 1);
    const diffW = (endColor.w - startColor.w) / (colorsNumber - 1);
    const diffB = (endColor.b - startColor.b) / (colorsNumber - 1);
    scale.push(startColor);
    for (let i = 1; i < colorsNumber; i++) {
      const h = startColor.h + diffH * i;
      const w = startColor.w + diffW * i;
      const b = startColor.b + diffB * i;
      scale.push({ h, w, b });
    }
    return scale;
  },
  getScaleRal: (startColor, endColor, colorsNumber) => {
    const startColorRgb = Converter.convert('RAL', 'RGB', startColor);
    const endColorRgb = Converter.convert('RAL', 'RGB', endColor);
    const scaleRgb = getScaleRgb(startColorRgb, endColorRgb, colorsNumber);
    return scaleRgb.map((color) => Converter.convert('RGB', 'RAL', color));
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

// Step-based scalers
export const stepScalers: StepScalers = {
  getScaleFromStepCmyk: (startColor, step, colorsNumber) => {
    const stepCmyk = {
      c: (step.c as number) || 0,
      m: (step.m as number) || 0,
      y: (step.y as number) || 0,
      k: (step.k as number) || 0,
    };
    return generateScaleFromStepCmyk(startColor, stepCmyk, colorsNumber);
  },
  getScaleFromStepHex: (startColor, step, colorsNumber) => {
    const startColorRgb = Converter.convert('HEX', 'RGB', startColor);
    // For HEX, step is expected in RGB format
    const stepRgb = {
      r: ((step as unknown as { r?: number }).r as number) || 0,
      g: ((step as unknown as { g?: number }).g as number) || 0,
      b: ((step as unknown as { b?: number }).b as number) || 0,
    };
    const scaleRgb = generateScaleFromStepRgb(startColorRgb, stepRgb, colorsNumber);
    return scaleRgb.map((color) => Converter.convert('RGB', 'HEX', color));
  },
  getScaleFromStepHsl: (startColor, step, colorsNumber) => {
    const stepHsl = {
      h: (step.h as number) || 0,
      s: (step.s as number) || 0,
      l: (step.l as number) || 0,
    };
    return generateScaleFromStepHsl(startColor, stepHsl, colorsNumber);
  },
  getScaleFromStepHsv: (startColor, step, colorsNumber) => {
    const stepHsv = {
      h: (step.h as number) || 0,
      s: (step.s as number) || 0,
      v: (step.v as number) || 0,
    };
    return generateScaleFromStepHsv(startColor, stepHsv, colorsNumber);
  },
  getScaleFromStepHwb: (startColor, step, colorsNumber) => {
    const stepHwb = {
      h: (step.h as number) || 0,
      w: (step.w as number) || 0,
      b: (step.b as number) || 0,
    };
    return generateScaleFromStepHwb(startColor, stepHwb, colorsNumber);
  },
  getScaleFromStepRal: (startColor, step, colorsNumber) => {
    const startColorRgb = Converter.convert('RAL', 'RGB', startColor);
    // For RAL, step is expected in RGB format
    const stepRgb = {
      r: ((step as unknown as { r?: number }).r as number) || 0,
      g: ((step as unknown as { g?: number }).g as number) || 0,
      b: ((step as unknown as { b?: number }).b as number) || 0,
    };
    const scaleRgb = generateScaleFromStepRgb(startColorRgb, stepRgb, colorsNumber);
    return scaleRgb.map((color) => Converter.convert('RGB', 'RAL', color));
  },
  getScaleFromStepRgb: (startColor, step, colorsNumber) => {
    const stepRgb = {
      r: (step.r as number) || 0,
      g: (step.g as number) || 0,
      b: (step.b as number) || 0,
    };
    return generateScaleFromStepRgb(startColor, stepRgb, colorsNumber);
  },
};
