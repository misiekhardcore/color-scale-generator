import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CopyButton } from './CopyButton';

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

beforeEach(() => {
  jest.useFakeTimers();
});

describe('CopyButton', () => {
  it('should render', () => {
    render(<CopyButton text="text" />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('should copy text to clipboard', async () => {
    render(<CopyButton text="text" />);
    const button = screen.getByText('Copy');
    fireEvent.click(button);
    expect(button).toHaveTextContent('Copied!');
    expect(button).toBeDisabled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('text');
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => expect(button).toHaveTextContent('Copy'));
    expect(button).not.toBeDisabled();
  });
});
