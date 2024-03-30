import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from './Input';

describe('Input', () => {
  it('should render properly', () => {
    render(<Input value="test" onChange={() => {}} label="Test" />);
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    render(<Input value="test" onChange={onChange} label="Test" />);
    fireEvent.change(screen.getByDisplayValue('test'), { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith('new value');
  });
});
