import { Stringifiers } from './types';

export const stringifiers: Stringifiers = {
  cmykToString: ({ c, m, y, k }) => {
    return `cmyk(${formatNumber(c * 100)}%, ${formatNumber(m * 100)}%, ${formatNumber(y * 100)}%, ${formatNumber(k * 100)}%)`;
  },

  hexToString: ({ hex }) => {
    return hex.toUpperCase();
  },

  hslToString: ({ h, s, l }) => {
    return `hsl(${formatNumber(h)}, ${formatNumber(s * 100)}%, ${formatNumber(l * 100)}%)`;
  },

  hsvToString: ({ h, s, v }) => {
    return `hsv(${formatNumber(h)}, ${formatNumber(s * 100)}%, ${formatNumber(v * 100)}%)`;
  },

  hwbToString: ({ h, w, b }) => {
    return `hwb(${formatNumber(h)}, ${formatNumber(w * 1003)}%, ${formatNumber(b * 1003)}%)`;
  },

  ralToString: ({ ral }) => {
    return `RAL ${ral}`;
  },
  rgbToString: ({ r, g, b }) => {
    return `rgb(${formatNumber(r)}, ${formatNumber(g)}, ${formatNumber(b)})`;
  },
};

const MAX_DECIMALS = 2;

function formatNumber(num: string | number): string {
  const formattedNum = parseFloat(num.toString()).toFixed(MAX_DECIMALS);
  return formattedNum.includes('.') ? formattedNum.replace(/\.?0*$/, '') : formattedNum;
}
