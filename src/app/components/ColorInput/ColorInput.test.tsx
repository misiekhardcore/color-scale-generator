import { fireEvent, render, screen } from '@testing-library/react';
import { ColorInput } from './ColorInput';

describe('ColorInput', () => {
  it('should render properly', () => {
    render(
      <ColorInput
        type="RGB"
        value={{
          r: 127,
          g: 127,
          b: 127,
        }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('R')).toHaveValue(127);
    expect(screen.getByLabelText('G')).toHaveValue(127);
    expect(screen.getByLabelText('B')).toHaveValue(127);
  });

  it('should handle change', () => {
    const handleChange = jest.fn();
    render(
      <ColorInput
        type="RGB"
        value={{
          r: 127,
          g: 127,
          b: 127,
        }}
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('R'), {
      target: {
        value: 128,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      r: 128,
      g: 127,
      b: 127,
    });
    fireEvent.change(screen.getByLabelText('G'), {
      target: {
        value: 128,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      r: 127,
      g: 128,
      b: 127,
    });
    fireEvent.change(screen.getByLabelText('B'), {
      target: {
        value: 128,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      r: 127,
      g: 127,
      b: 128,
    });
  });
});
