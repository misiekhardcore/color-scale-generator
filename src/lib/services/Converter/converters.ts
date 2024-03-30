import { Converters, ConvertersFromRGB, ConvertersToRGB } from './types';

const convertersToRgb: ConvertersToRGB = {
  cmykToRgb: (color) => {
    const { c, m, y, k } = color;
    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));
    return { r, g, b };
  },
  hexToRgb: (color) => {
    const r = parseInt(color.hex.slice(1, 3), 16);
    const g = parseInt(color.hex.slice(3, 5), 16);
    const b = parseInt(color.hex.slice(5, 7), 16);
    return { r, g, b };
  },
  hslToRgb: (color) => {
    const { h, s, l } = color;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  },
  hsvToRgb: (color) => {
    const { h, s, v } = color;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  },
  rgbToRgb: (color) => color,
};

const convertersFromRgb: ConvertersFromRGB = {
  rgbToCmyk: (color) => {
    const { r, g, b } = color;
    if (r == 0 && g == 0 && b == 0) {
      return { c: 0, m: 0, y: 0, k: 1 };
    } else {
      const calcR = 1 - r / 255;
      const calcG = 1 - g / 255;
      const calcB = 1 - b / 255;

      const k = Math.min(calcR, Math.min(calcG, calcB));
      const c = (calcR - k) / (1 - k);
      const m = (calcG - k) / (1 - k);
      const y = (calcB - k) / (1 - k);

      return { c, m, y, k };
    }
  },
  rgbToHex: (color) => {
    return {
      hex: `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b
        .toString(16)
        .padStart(2, '0')}`,
    };
  },
  rgbToHsl: (color) => {
    const r1 = color.r / 255;
    const g1 = color.g / 255;
    const b1 = color.b / 255;

    const max = Math.max(r1, g1, b1);
    const min = Math.min(r1, g1, b1);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r1:
          h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
          break;
        case g1:
          h = (b1 - r1) / d + 2;
          break;
        case b1:
          h = (r1 - g1) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h, s, l };
  },
  rgbToHsv: (color) => {
    const r1 = color.r / 255;
    const g1 = color.g / 255;
    const b1 = color.b / 255;

    const max = Math.max(r1, g1, b1);
    const min = Math.min(r1, g1, b1);
    let h = 0;
    let s = 0;
    const v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max !== min) {
      switch (max) {
        case r1:
          h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
          break;
        case g1:
          h = (b1 - r1) / d + 2;
          break;
        case b1:
          h = (r1 - g1) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h, s, v };
  },
  rgbToRgb: (color) => color,
};

export const converters: Converters = {
  ...convertersToRgb,
  ...convertersFromRgb,
  cmykToHex: (color) => {
    const rgb = convertersToRgb.cmykToRgb(color);
    return convertersFromRgb.rgbToHex(rgb);
  },
  hexToHsl: (color) => {
    const rgb = convertersToRgb.hexToRgb(color);
    return convertersFromRgb.rgbToHsl(rgb);
  },
  hexToHsv: (color) => {
    const rgb = convertersToRgb.hexToRgb(color);
    return convertersFromRgb.rgbToHsv(rgb);
  },
  hslToHex: (color) => {
    const rgb = convertersToRgb.hslToRgb(color);
    return convertersFromRgb.rgbToHex(rgb);
  },
  hslToHsv: (color) => {
    const rgb = convertersToRgb.hslToRgb(color);
    return convertersFromRgb.rgbToHsv(rgb);
  },
  hsvToHex: (color) => {
    const rgb = convertersToRgb.hsvToRgb(color);
    return convertersFromRgb.rgbToHex(rgb);
  },
  hsvToHsl: (color) => {
    const rgb = convertersToRgb.hsvToRgb(color);
    return convertersFromRgb.rgbToHsl(rgb);
  },
  cmykToHsl: (color) => {
    const rgb = convertersToRgb.cmykToRgb(color);
    return convertersFromRgb.rgbToHsl(rgb);
  },
  cmykToHsv: (color) => {
    const rgb = convertersToRgb.cmykToRgb(color);
    return convertersFromRgb.rgbToHsv(rgb);
  },
  hsvToCmyk: (color) => {
    const rgb = convertersToRgb.hsvToRgb(color);
    return convertersFromRgb.rgbToCmyk(rgb);
  },
  hexToCmyk: (color) => {
    const rgb = convertersToRgb.hexToRgb(color);
    return convertersFromRgb.rgbToCmyk(rgb);
  },
  hslToCmyk: (color) => {
    const rgb = convertersToRgb.hslToRgb(color);
    return convertersFromRgb.rgbToCmyk(rgb);
  },
  hexToHex: (color) => color,
  hslToHsl: (color) => color,
  hsvToHsv: (color) => color,
  cmykToCmyk: (color) => color,
};
