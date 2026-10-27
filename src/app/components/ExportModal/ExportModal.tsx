'use client';

import { DownloadIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import type { ColorTypeMap } from '@/app/types';
import type { Exporters } from '@/lib/services';
import { Exporter } from '@/lib/services';

import { CopyButton } from './CopyButton';

type ExportModalProps<T extends keyof ColorTypeMap> = {
  from: T;
  scale: ColorTypeMap[T][];
};

const DEFAULT_EXPORTER: keyof Exporters = 'exportCssHex';

const EXPORT_FORMAT_LABELS: Record<keyof Exporters, string> = {
  exportCssHex: 'CSS custom properties - hex',
  exportCssRgb: 'CSS custom properties - rgb',
  exportCssHsl: 'CSS custom properties - hsl',
  exportCssHwb: 'CSS custom properties - hwb',
  exportSassHex: 'Sass variables - hex',
  exportSassRgb: 'Sass variables - rgb',
  exportSassHsl: 'Sass variables - hsl',
  exportSassHwb: 'Sass variables - hwb',
  exportHex: 'Plain list - hex',
  exportRgb: 'Plain list - rgb',
  exportHsl: 'Plain list - hsl',
  exportHsv: 'Plain list - hsv',
  exportHwb: 'Plain list - hwb',
  exportCmyk: 'Plain list - cmyk',
  exportRal: 'Plain list - ral',
};

const EXPORT_FORMAT_ORDER: (keyof Exporters)[] = [
  'exportCssHex',
  'exportCssRgb',
  'exportCssHsl',
  'exportCssHwb',
  'exportSassHex',
  'exportSassRgb',
  'exportSassHsl',
  'exportSassHwb',
  'exportHex',
  'exportRgb',
  'exportHsl',
  'exportHsv',
  'exportHwb',
  'exportCmyk',
  'exportRal',
];

export function ExportModal<T extends keyof ColorTypeMap>({ from, scale }: ExportModalProps<T>) {
  const formatId = useId();
  const [selectedExporter, setSelectedExporter] = useState<keyof Exporters>(DEFAULT_EXPORTER);
  const exportScale = Exporter.export(from, selectedExporter, scale).join('\n');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>
            Copy the scale as CSS or Sass variables, or as a plain color list.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={formatId}>Format</Label>
            <Select
              value={selectedExporter}
              onValueChange={(value) => setSelectedExporter(value as keyof Exporters)}
            >
              <SelectTrigger id={formatId} className="w-full">
                <SelectValue>{EXPORT_FORMAT_LABELS[selectedExporter]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {EXPORT_FORMAT_ORDER.map((format) => (
                  <SelectItem key={format} value={format}>
                    {EXPORT_FORMAT_LABELS[format]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <pre className="max-h-64 overflow-auto rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed">
            {exportScale}
          </pre>
        </div>

        <DialogFooter>
          <CopyButton text={exportScale} />
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
