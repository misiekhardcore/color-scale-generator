'use client';

import { useState } from 'react';

import { ColorTypeMap } from '@/app/types';
import { Exporter, Exporters, exporters } from '@/lib/services';
import { Button, Modal, Selector } from '@/app/components';

import { CopyButton } from './CopyButton';

type ExportModalProps<T extends keyof ColorTypeMap> = {
  open: boolean;
  onClose: () => void;
  from: T;
  scale: ColorTypeMap[T][];
};

const DEFAULT_EXPORTER: keyof Exporters = 'exportCssHex';

export function ExportModal<T extends keyof ColorTypeMap>({
  open,
  onClose,
  from,
  scale,
}: ExportModalProps<T>) {
  const [selectedExporter, setSelectedExporter] = useState<keyof Exporters>(DEFAULT_EXPORTER);
  const exportScale = Exporter.export(from, selectedExporter, scale).join('\n');

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <h2 className="text-lg font-semibold">Export</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-2 w-full">
          <CopyButton text={exportScale} />
          <Selector
            items={Object.keys(exporters) as (keyof Exporters)[]}
            selected={selectedExporter}
            onChange={setSelectedExporter}
            label="Format"
          />
          <pre className="bg-gray-100 p-4 rounded-sm overflow-y-auto">{exportScale}</pre>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
