import React from 'react';

interface SaveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SaveButton({
  children,
  className,
  ...rest
}: SaveButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl border-2 border-black bg-h3Purple p-2 text-xl font-bold text-white transition-colors duration-200 ease-in-out hover:bg-h3DarkPurple disabled:bg-gray-400 ${
        className || ''
      }`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
