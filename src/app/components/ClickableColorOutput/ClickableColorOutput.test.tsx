import { fireEvent, render, screen } from '@testing-library/react';

import { getMouseEvent } from '@/tests/services';

import { ClickableColorOutput } from './ClickableColorOutput';

describe('ClickableColorOutput', () => {
  it('should render properly', () => {
    render(<ClickableColorOutput value={{ r: 0, g: 0, b: 0 }} type="RGB" />);
    expect(screen.getByText('R:')).toBeInTheDocument();
  });

  it('should change color space', () => {
    render(<ClickableColorOutput value={{ r: 0, g: 0, b: 0 }} type="RGB" />);
    expect(screen.getByText('R:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 0, pageY: 0 }));
    expect(screen.getByText('C:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 0, pageY: 0 }));
    expect(screen.getByText('L:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 0, pageY: 0 }));
    expect(screen.getByText('V:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 0, pageY: 0 }));
    expect(screen.getByText('HEX:')).toBeInTheDocument();
  });

  it('should not change color if mouse was dragged', () => {
    render(<ClickableColorOutput value={{ r: 0, g: 0, b: 0 }} type="RGB" />);
    expect(screen.getByText('R:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 5, pageY: 0 }));
    expect(screen.getByText('R:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 0, pageY: 5 }));
    expect(screen.getByText('R:')).toBeInTheDocument();
  });

  it('should not change color if delay passed from mousedown to mouseup', () => {
    jest.useFakeTimers();
    render(<ClickableColorOutput value={{ r: 0, g: 0, b: 0 }} type="RGB" />);
    expect(screen.getByText('R:')).toBeInTheDocument();

    fireEvent(screen.getByRole('list'), getMouseEvent('mousedown', { pageX: 0, pageY: 0 }));
    jest.advanceTimersByTime(100);
    fireEvent(screen.getByRole('list'), getMouseEvent('mouseup', { pageX: 0, pageY: 0 }));
    expect(screen.getByText('R:')).toBeInTheDocument();
  });
});
