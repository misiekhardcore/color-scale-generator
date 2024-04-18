import { ColorTypeMap } from '@/app/types';

import { exporters } from './exporters';
import { Exporters } from './types';

export class Exporter {
  static getExporter<T extends keyof Exporters, P extends keyof ColorTypeMap>(type: T) {
    if (!exporters[type]) {
      throw new Error(`No exporter ${type} found`);
    }
    return exporters[type] as (from: P, scale: ColorTypeMap[P][]) => string[];
  }

  static export<T extends keyof Exporters, P extends keyof ColorTypeMap>(
    from: P,
    toType: T,
    scale: ColorTypeMap[P][]
  ) {
    const exporter = this.getExporter(toType);
    return exporter(from, scale);
  }
}
