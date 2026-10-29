import { TooltipProvider } from '@konopskidev/ui';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import { ScaleResults } from './ScaleResults';

const scale = [
  { r: 255, g: 0, b: 0 },
  { r: 127, g: 127, b: 0 },
  { r: 0, g: 255, b: 0 },
];

function renderScaleResults(ui: ReactElement) {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
}

describe('ScaleResults', () => {
  it('should render one swatch per color in the scale', () => {
    renderScaleResults(<ScaleResults scale={scale} colorSpace="RGB" />);

    expect(screen.getAllByRole('list')).toHaveLength(3);
  });

  it('should render a preview of the whole scale', () => {
    renderScaleResults(<ScaleResults scale={scale} colorSpace="RGB" />);

    expect(
      screen.getByRole('img', { name: 'Preview of the generated 3 color scale' })
    ).toBeInTheDocument();
  });

  it('should open the export dialog from the results header', () => {
    renderScaleResults(<ScaleResults scale={scale} colorSpace="RGB" />);

    fireEvent.click(screen.getByRole('button', { name: 'Export' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
