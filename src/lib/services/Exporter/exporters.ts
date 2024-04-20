import { Exporters } from './types';
import { Converter } from '../Converter';
import { Stringifier } from '../Stringifier';

const CSS_VARIABLE_PREFIX = 'color';

export const exporters: Exporters = {
  exportCmyk: (from, scale) => {
    const c = Converter.getConverter(from, 'CMYK');
    return scale.map(c).map(Stringifier.getStrigifier('CMYK'));
  },
  exportHex: (from, scale) => {
    const c = Converter.getConverter(from, 'HEX');
    return scale.map(c).map(Stringifier.getStrigifier('HEX'));
  },
  exportHsl: (from, scale) => {
    const c = Converter.getConverter(from, 'HSL');
    return scale.map(c).map(Stringifier.getStrigifier('HSL'));
  },
  exportHsv: (from, scale) => {
    const c = Converter.getConverter(from, 'HSV');
    return scale.map(c).map(Stringifier.getStrigifier('HSV'));
  },
  exportHwb: (from, scale) => {
    const c = Converter.getConverter(from, 'HWB');
    return scale.map(c).map(Stringifier.getStrigifier('HWB'));
  },
  exportRal: (from, scale) => {
    const c = Converter.getConverter(from, 'RAL');
    return scale.map(c).map(Stringifier.getStrigifier('RAL'));
  },
  exportRgb: (from, scale) => {
    const c = Converter.getConverter(from, 'RGB');
    return scale.map(c).map(Stringifier.getStrigifier('RGB'));
  },
  exportCssHex: (from, scale) => {
    const c = Converter.getConverter(from, 'HEX');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toCssVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('HEX', convertedScale[i]))
      );
    }
    return result;
  },
  exportCssHsl: (from, scale) => {
    const c = Converter.getConverter(from, 'HSL');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toCssVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('HSL', convertedScale[i]))
      );
    }
    return result;
  },
  exportCssHwb: (from, scale) => {
    const c = Converter.getConverter(from, 'HWB');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toCssVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('HWB', convertedScale[i]))
      );
    }
    return result;
  },
  exportCssRgb: (from, scale) => {
    const c = Converter.getConverter(from, 'RGB');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toCssVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('RGB', convertedScale[i]))
      );
    }
    return result;
  },
  exportSassHex: (from, scale) => {
    const c = Converter.getConverter(from, 'HEX');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toSassVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('HEX', convertedScale[i]))
      );
    }
    return result;
  },
  exportSassHsl: (from, scale) => {
    const c = Converter.getConverter(from, 'HSL');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toSassVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('HSL', convertedScale[i]))
      );
    }
    return result;
  },
  exportSassHwb: (from, scale) => {
    const c = Converter.getConverter(from, 'HWB');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toSassVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('HWB', convertedScale[i]))
      );
    }
    return result;
  },
  exportSassRgb: (from, scale) => {
    const c = Converter.getConverter(from, 'RGB');
    const result: string[] = [];
    const convertedScale = scale.map(c);
    for (let i = 0; i < convertedScale.length; i++) {
      result.push(
        toSassVariable(CSS_VARIABLE_PREFIX, i, Stringifier.stringify('RGB', convertedScale[i]))
      );
    }
    return result;
  },
};

function toCssVariable(name: string, index: number, value: string): string {
  return `--${name}-${index + 1}: ${value};`;
}

function toSassVariable(name: string, index: number, value: string): string {
  return `$${name}-${index + 1}: ${value};`;
}
