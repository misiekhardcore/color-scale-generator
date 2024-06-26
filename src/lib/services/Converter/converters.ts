import { RGB } from '@/app/types';

import { Converters, ConvertersFromRGB, ConvertersToRGB } from './types';

import ralrgb from './RAL-RGB.json';

function findClosestRal(color: RGB) {
  let closestRal = 0;
  let smallestDistance = Infinity;

  ralrgb.forEach((item) => {
    const distance = Math.sqrt(
      Math.pow(item.RGB.r - color.r, 2) +
        Math.pow(item.RGB.g - color.g, 2) +
        Math.pow(item.RGB.b - color.b, 2)
    );

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestRal = item.RAL;
    }
  });

  return { ral: closestRal };
}

const convertersToRgb: ConvertersToRGB = {
  cmykToRgb: (color) => {
    const { c, m, y, k } = color;
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);
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
      r: (r + m) * 255,
      g: (g + m) * 255,
      b: (b + m) * 255,
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
      r: (r + m) * 255,
      g: (g + m) * 255,
      b: (b + m) * 255,
    };
  },
  hwbToRgb: (color) => {
    const h = color.h / 60;
    const w = color.w;
    const blackness = color.b;

    const i = Math.floor(h);
    const f = h - i;
    const v = 1 - blackness;
    const n = w + f * (v - w);

    let r: number, g: number, b: number;
    switch (i) {
      case 0:
        r = v;
        g = n;
        b = w;
        break;
      case 1:
        r = n;
        g = v;
        b = w;
        break;
      case 2:
        r = w;
        g = v;
        b = n;
        break;
      case 3:
        r = w;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = w;
        b = v;
        break;
      default:
        r = v;
        g = w;
        b = n;
        break;
    }
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255,
    };
  },
  ralToRgb: (color) => {
    const ral = ralrgb.find((item) => item.RAL === color.ral);
    return ral ? ral.RGB : { r: 0, g: 0, b: 0 };
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
      hex: `#${Math.round(color.r).toString(16).padStart(2, '0')}${Math.round(color.g).toString(16).padStart(2, '0')}${Math.round(
        color.b
      )
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
      h *= 360;
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
      h *= 360;
    }

    return { h, s, v };
  },
  rgbToHwb: (color) => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const blackness = 1 - max;
    const whiteness = min;

    let hue = 0;
    if (max !== min) {
      if (max === r) {
        hue = (g - b) / (max - min);
      } else if (max === g) {
        hue = 2 + (b - r) / (max - min);
      } else {
        hue = 4 + (r - g) / (max - min);
      }
      hue *= 60;
      if (hue < 0) {
        hue += 360;
      }
    }

    return { h: hue, w: whiteness, b: blackness };
  },
  rgbToRal: (color) => {
    return findClosestRal(color);
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
  hwbToCmyk: (color) => {
    const rgb = convertersToRgb.hwbToRgb(color);
    return convertersFromRgb.rgbToCmyk(rgb);
  },
  hwbToHex: (color) => {
    const rgb = convertersToRgb.hwbToRgb(color);
    return convertersFromRgb.rgbToHex(rgb);
  },
  hwbToHsl: (color) => {
    const rgb = convertersToRgb.hwbToRgb(color);
    return convertersFromRgb.rgbToHsl(rgb);
  },
  hwbToHsv: (color) => {
    const rgb = convertersToRgb.hwbToRgb(color);
    return convertersFromRgb.rgbToHsv(rgb);
  },
  cmykToHwb: (color) => {
    const rgb = convertersToRgb.cmykToRgb(color);
    return convertersFromRgb.rgbToHwb(rgb);
  },
  hexToHwb: (color) => {
    const rgb = convertersToRgb.hexToRgb(color);
    return convertersFromRgb.rgbToHwb(rgb);
  },
  hslToHwb: (color) => {
    const rgb = convertersToRgb.hslToRgb(color);
    return convertersFromRgb.rgbToHwb(rgb);
  },
  hsvToHwb: (color) => {
    const rgb = convertersToRgb.hsvToRgb(color);
    return convertersFromRgb.rgbToHwb(rgb);
  },
  ralToHex: (color) => {
    const rgb = convertersToRgb.ralToRgb(color);
    return convertersFromRgb.rgbToHex(rgb);
  },
  ralToHsl: (color) => {
    const rgb = convertersToRgb.ralToRgb(color);
    return convertersFromRgb.rgbToHsl(rgb);
  },
  ralToHsv: (color) => {
    const rgb = convertersToRgb.ralToRgb(color);
    return convertersFromRgb.rgbToHsv(rgb);
  },
  ralToCmyk: (color) => {
    const rgb = convertersToRgb.ralToRgb(color);
    return convertersFromRgb.rgbToCmyk(rgb);
  },
  ralToHwb: (color) => {
    const rgb = convertersToRgb.ralToRgb(color);
    return convertersFromRgb.rgbToHwb(rgb);
  },
  cmykToRal: (color) => {
    const rgb = convertersToRgb.cmykToRgb(color);
    return convertersFromRgb.rgbToRal(rgb);
  },
  hexToRal: (color) => {
    const rgb = convertersToRgb.hexToRgb(color);
    return convertersFromRgb.rgbToRal(rgb);
  },
  hslToRal: (color) => {
    const rgb = convertersToRgb.hslToRgb(color);
    return convertersFromRgb.rgbToRal(rgb);
  },
  hsvToRal: (color) => {
    const rgb = convertersToRgb.hsvToRgb(color);
    return convertersFromRgb.rgbToRal(rgb);
  },
  hwbToRal: (color) => {
    const rgb = convertersToRgb.hwbToRgb(color);
    return convertersFromRgb.rgbToRal(rgb);
  },
  hexToHex: (color) => color,
  hslToHsl: (color) => color,
  hsvToHsv: (color) => color,
  cmykToCmyk: (color) => color,
  hwbToHwb: (color) => color,
  ralToRal: (color) => color,
};
