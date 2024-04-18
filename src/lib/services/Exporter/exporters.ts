import { HEX, RGB } from '@/app/types';
import { Exporters } from './types';
import { Converter } from '../Converter';

const CSS_VARIABLE_PREFIX = 'color';

export const exporters: Exporters = {
  exportCssHex: (from, scale) => {
    const c = Converter.getConverter(from, 'HEX');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(`${toCssVariable(CSS_VARIABLE_PREFIX, i, hexToString(convertedScale[i]))}`);
    }
    return result;
  },
  exportCssRgb: (from, scale) => {
    const c = Converter.getConverter(from, 'RGB');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(`${toCssVariable(CSS_VARIABLE_PREFIX, i, rgbToString(convertedScale[i]))}`);
    }
    return result;
  },
  exportSassHex: (from, scale) => {
    const c = Converter.getConverter(from, 'HEX');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(`$${CSS_VARIABLE_PREFIX}-${i + 1}: ${hexToString(convertedScale[i])});`);
    }
    return result;
  },
  exportSassRgb: (from, scale) => {
    const c = Converter.getConverter(from, 'RGB');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(`$${CSS_VARIABLE_PREFIX}-${i + 1}: ${rgbToString(convertedScale[i])};`);
    }
    return result;
  },
};

function hexToString({ hex }: HEX): string {
  return hex;
}

function rgbToString({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function toCssVariable(name: string, index: number, value: string): string {
  return `--${name}-${index + 1}: ${value};`;
}
