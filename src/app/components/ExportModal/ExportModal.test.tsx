import { render, screen } from '@testing-library/react';

import { ExportModal } from './ExportModal';

describe('ExportModal', () => {
  it('should render', () => {
    render(<ExportModal open onClose={() => {}} from="HEX" scale={[{ hex: '#000000' }]} />);

    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('--color-1: #000000;')).toBeInTheDocument();
  });
});
