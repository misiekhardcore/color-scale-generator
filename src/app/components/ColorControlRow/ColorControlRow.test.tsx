import { render, screen } from '@testing-library/react';

import { ColorControlRow } from './ColorControlRow';

describe('ColorControlRow', () => {
  it('should render the selector', () => {
    render(
      <ColorControlRow
        selector={<label htmlFor="test">Color Space</label>}
        startControl={<input id="test" />}
      />
    );

    expect(screen.getByText('Color Space')).toBeInTheDocument();
  });

  it('should render the start control', () => {
    render(
      <ColorControlRow selector={<span>Label</span>} startControl={<span>Start Control</span>} />
    );

    expect(screen.getByText('Start Control')).toBeInTheDocument();
  });

  it('should render the end control when provided', () => {
    render(
      <ColorControlRow
        selector={<span>Label</span>}
        startControl={<span>Start</span>}
        endControl={<span>End Control</span>}
      />
    );

    expect(screen.getByText('End Control')).toBeInTheDocument();
  });

  it('should not render end control when omitted', () => {
    render(<ColorControlRow selector={<span>Label</span>} startControl={<span>Start</span>} />);

    expect(screen.queryByText('End Control')).not.toBeInTheDocument();
  });
});
