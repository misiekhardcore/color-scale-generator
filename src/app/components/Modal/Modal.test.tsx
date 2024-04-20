import { fireEvent, render, screen } from '@testing-library/react';
import { Modal, useModal } from './Modal';

describe('Modal', () => {
  it('should render', () => {
    render(
      <Modal open onClose={() => {}}>
        Test
      </Modal>
    );

    expect(screen.getByRole('dialog')).toHaveTextContent('Test');
  });

  it('should not render if closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Test
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close on background click', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        Test
      </Modal>
    );

    fireEvent.click(screen.getByRole('dialog').parentElement!);

    expect(onClose).toHaveBeenCalled();
  });

  it('should not close on dialog click', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        Test
      </Modal>
    );

    fireEvent.click(screen.getByRole('dialog'));

    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('useModal', () => {
  function Mock() {
    return Object.keys(useModal()).join('');
  }
  it('should throw if not used within Modal', () => {
    expect(() => {
      render(<Mock />);
    }).toThrow();
  });

  it('should return context', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        <Mock />
      </Modal>
    );

    expect(screen.getByText('childrenopenonClose')).toBeInTheDocument();
  });
});
