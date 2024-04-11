import { fireEvent, render, screen } from '@testing-library/react';
import { ColorInput } from '../ColorInput';

describe('CymkInput', () => {
  it('should render properly', () => {
    render(
      <ColorInput
        type="CMYK"
        value={{
          c: 0,
          y: 0,
          m: 0,
          k: 0,
        }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('C')).toHaveValue(0);
    expect(screen.getByLabelText('Y')).toHaveValue(0);
    expect(screen.getByLabelText('M')).toHaveValue(0);
    expect(screen.getByLabelText('K')).toHaveValue(0);
  });

  it('should handle change', () => {
    const handleChange = jest.fn();
    render(
      <ColorInput
        type="CMYK"
        value={{
          c: 0,
          y: 0,
          m: 0,
          k: 0,
        }}
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('C'), {
      target: {
        value: 0.1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      c: 0.1,
      y: 0,
      m: 0,
      k: 0,
    });
    fireEvent.change(screen.getByLabelText('Y'), {
      target: {
        value: 0.1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      c: 0,
      y: 0.1,
      m: 0,
      k: 0,
    });
    fireEvent.change(screen.getByLabelText('M'), {
      target: {
        value: 0.1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      c: 0,
      y: 0,
      m: 0.1,
      k: 0,
    });
    fireEvent.change(screen.getByLabelText('K'), {
      target: {
        value: 0.1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      c: 0,
      y: 0,
      m: 0,
      k: 0.1,
    });
  });
});

describe('HexInput', () => {
  it('should render properly', () => {
    render(
      <ColorInput
        type="HEX"
        value={{
          hex: '#000000',
        }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('Hex')).toHaveValue('#000000');
  });

  it('should handle change', () => {
    const handleChange = jest.fn();
    render(
      <ColorInput
        type="HEX"
        value={{
          hex: '#000000',
        }}
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('Hex'), {
      target: {
        value: '#111111',
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      hex: '#111111',
    });
  });
});

describe('HslInput', () => {
  it('should render properly', () => {
    render(
      <ColorInput
        type="HSL"
        value={{
          h: 0,
          s: 0,
          l: 0,
        }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('H')).toHaveValue(0);
    expect(screen.getByLabelText('S')).toHaveValue(0);
    expect(screen.getByLabelText('L')).toHaveValue(0);
  });

  it('should handle change', () => {
    const handleChange = jest.fn();
    render(
      <ColorInput
        type="HSL"
        value={{
          h: 0,
          s: 0,
          l: 0,
        }}
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('H'), {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      h: 1,
      s: 0,
      l: 0,
    });
    fireEvent.change(screen.getByLabelText('S'), {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      h: 0,
      s: 1,
      l: 0,
    });
    fireEvent.change(screen.getByLabelText('L'), {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      h: 0,
      s: 0,
      l: 1,
    });
  });
});

describe('HsvInput', () => {
  it('should render properly', () => {
    render(
      <ColorInput
        type="HSV"
        value={{
          h: 0,
          s: 0,
          v: 0,
        }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByLabelText('H')).toHaveValue(0);
    expect(screen.getByLabelText('S')).toHaveValue(0);
    expect(screen.getByLabelText('V')).toHaveValue(0);
  });

  it('should handle change', () => {
    const handleChange = jest.fn();
    render(
      <ColorInput
        type="HSV"
        value={{
          h: 0,
          s: 0,
          v: 0,
        }}
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('H'), {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      h: 1,
      s: 0,
      v: 0,
    });
    fireEvent.change(screen.getByLabelText('S'), {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      h: 0,
      s: 1,
      v: 0,
    });
    fireEvent.change(screen.getByLabelText('V'), {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toHaveBeenCalledWith({
      h: 0,
      s: 0,
      v: 1,
    });
  });
});

describe('RgbInput', () => {
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
