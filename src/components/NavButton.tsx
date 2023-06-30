import React from 'react';

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function NavButton({
  children,
  className,
  as = 'button',
  ...rest
}: NavButtonProps) {
  const Component = as;

  return (
    <Component
      className={`flex items-center justify-center rounded-full border-2 border-black bg-black p-[8px] text-white transition-colors duration-200 ease-in-out ${
        className || ''
      }`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
