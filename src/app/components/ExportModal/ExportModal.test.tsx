import { fireEvent, render, screen } from '@testing-library/react';

import { ExportModal } from './ExportModal';

describe('ExportModal', () => {
  it('should stay closed until the export trigger is used', () => {
    render(<ExportModal from="HEX" scale={[{ hex: '#000000' }]} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
  });

  it('should show the exported scale once opened', () => {
    render(<ExportModal from="HEX" scale={[{ hex: '#000000' }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Export' }));

    expect(screen.getByRole('dialog', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('--color-1: #000000;')).toBeInTheDocument();
  });

  it('should describe itself as a modal dialog', () => {
    render(<ExportModal from="HEX" scale={[{ hex: '#000000' }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Export' }));

    expect(screen.getByRole('dialog', { name: 'Export' })).toHaveAttribute('aria-modal', 'true');
  });
});
