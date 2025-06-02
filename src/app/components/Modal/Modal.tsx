import classNames from 'classnames';
import { ComponentProps, MouseEvent, ReactNode, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = ComponentProps<'div'> & {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalContext = createContext<ModalProps | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal');
  }
  return context;
}

export function Modal({ children, open, onClose, className }: ModalProps) {
  if (!open) {
    return null;
  }

  function onBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <ModalContext.Provider value={{ children, open, onClose }}>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            onClick={onBackgroundClick}
          >
            <div
              style={{ maxHeight: 'calc(100vh - 4rem)' }}
              role="dialog"
              className={classNames(
                'relative flex flex-col transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg',
                className
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

Modal.Body = function ModalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames('px-4 pb-4 pt-5 sm:p-6 sm:pb-4 overflow-y-auto', className)}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        'bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-end',
        className
      )}
    >
      {children}
    </div>
  );
};

Modal.Header = function ModalHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classNames('bg-gray-50 px-4 py-3 sm:px-6', className)}>{children}</div>;
};
