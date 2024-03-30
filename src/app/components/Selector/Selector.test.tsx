import { fireEvent, render, screen } from '@testing-library/react';

import { Selector } from './Selector';

describe('Selector', () => {
  it('should render properly', () => {
    render(
      <Selector
        label="Select color space"
        items={['RGB', 'CMYK']}
        selected="RGB"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Select color space')).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('RGB');
    expect(options[1]).toHaveTextContent('CMYK');
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    render(
      <Selector label="Label" items={['item1', 'item2']} selected="item1" onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Label'), { target: { value: 'item2' } });
    expect(onChange).toHaveBeenCalledWith('item2');
  });

  it('should call onChange with number', () => {
    const onChange = jest.fn();
    render(<Selector label="Label" items={[1, 2]} selected={1} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Label'), { target: { value: 2 } });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should not call onChange with undefined when selecting undefined', () => {
    const onChange = jest.fn();
    render(<Selector label="Label" items={[undefined, 2]} selected={2} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Label'), { target: { value: undefined } });
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
