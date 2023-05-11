import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  padding?: string;
  canOpenModal?: boolean;
  elementId?: string;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  padding = '',
  canOpenModal = true,
  elementId = 'modal-root'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const el = document.getElementById(elementId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (canOpenModal && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, canOpenModal]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full  overflow-auto bg-gray-800 bg-opacity-50">
      <div
        ref={modalRef}
        className={`relative ${padding} bg-white rounded-xl shadow-2xl`}
        style={{
          filter: 'drop-shadow(4px 4px 10px rgba(0,0,0,0.25))'
        }}>
        {children}
      </div>
    </div>,
    el as HTMLElement
  );
};

export default Modal;
