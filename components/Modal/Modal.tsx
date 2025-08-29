"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  /** Callback invoked when the modal should be closed */
  onClose: () => void;
  /** Modal content to render */
  children: React.ReactNode;
}

/**
 * A simple modal dialog implemented using React portals.  The modal listens
 * for the Escape key to allow keyboard dismissal and also closes when the
 * backdrop is clicked.  A `div` with an id of `modal-root` must be present
 * in the document (added in the root layout) in order for this component
 * to render correctly.
 */
export default function Modal({ onClose, children }: ModalProps) {
  // Ensure the modal is closed when the escape key is pressed
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const modalRoot = typeof document !== 'undefined'
    ? (document.getElementById('modal-root') as HTMLElement)
    : null;

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdrop}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}