import React from 'react';
import { ArrowDown, X } from 'react-feather';
import ReactFocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

interface ModalProps {
  title: string;
  handleDismiss: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, handleDismiss, children }: ModalProps) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        handleDismiss();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDismiss]);

  return (
    <ReactFocusLock returnFocus={true}>
      <RemoveScroll>
        <div className='fixed left-0 top-0 h-screen w-screen'>
          <div
            className='absolute h-full w-full bg-h3DarkPurple/80'
            onClick={handleDismiss}
          />
          <div
            className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-2xl p-4 md:p-8'
            role='dialog'
            aria-modal='true'
            aria-label={title}
          >
            <div className='mb-2 flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-black bg-white p-2 md:p-4'>
              <ArrowDown className='h-[1.6em] w-[1.6em]' />
              <h2 className='flex gap-2 text-lg font-bold md:text-xl'>
                {title}
              </h2>
              <button
                className='rounded-full border-2 border-black bg-white p-1'
                onClick={handleDismiss}
              >
                <X />
                <span className='sr-only'>Dismiss modal</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </RemoveScroll>
    </ReactFocusLock>
  );
}
