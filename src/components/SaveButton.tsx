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
  const classNames = `
    inline-flex
    items-center
    justify-center
    rounded-xl
    bg-h3Purple
    p-2
    text-xl
    font-bold
    text-white
    transition-colors
    duration-200
    ease-in-out
    hover:bg-h3DarkPurple
    disabled:bg-gray-400
    border-black
    border-2
    ${className || ''}
  `;

  return (
    <button className={classNames.trim()} {...rest}>
      {children}
    </button>
  );
}
