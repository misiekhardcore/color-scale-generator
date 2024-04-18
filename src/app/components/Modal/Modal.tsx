import { MouseEvent, ReactNode, createContext, useContext } from 'react';

type ModalProps = {
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

export function Modal({ children, open, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  function onBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <ModalContext.Provider value={{ children, open, onClose }}>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            onClick={onBackgroundClick}
          >
            <div
              role="dialog"
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">{children}</div>
    </div>
  );
};

Modal.Footer = function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 justify-end">{children}</div>
  );
};

Modal.Header = function ModalHeader({ children }: { children: ReactNode }) {
  return <div className="bg-gray-50 px-4 py-3 sm:px-6">{children}</div>;
};
