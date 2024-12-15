'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

type ModalProps = CustomComponentProps & {
  open: boolean;
  closeModal: () => void;
};

export default function Modal({
  className,
  children,
  open,
  closeModal
}: ModalProps) {
  return (
    <Dialog
      className={clsx(
        className,
        'relative z-50 transition data-[closed]:opacity-0'
      )}
      open={open}
      onClose={closeModal}
      transition
    >
      <DialogBackdrop className="fixed inset-0 bg-space-900/70" />

      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="inline-flex w-[320px] justify-center rounded-lg bg-space-800 p-12">
            <div className="inline-flex flex-col items-center space-y-4">
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
