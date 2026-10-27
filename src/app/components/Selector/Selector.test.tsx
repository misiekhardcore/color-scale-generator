import { render, screen } from '@testing-library/react';

import { Selector } from './Selector';

describe('Selector', () => {
  it('should render the label and the selected value', () => {
    render(
      <Selector
        label="Select color space"
        items={['RGB', 'CMYK']}
        selected="RGB"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText('Select color space')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveTextContent('RGB');
  });

  it('should render the selected value when it is a number', () => {
    render(<Selector label="Label" items={[1, 2]} selected={2} onChange={jest.fn()} />);

    expect(screen.getByRole('combobox')).toHaveTextContent('2');
  });
});
