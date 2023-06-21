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
  const classNames = `
    flex
    items-center
    justify-center
    rounded-full
    bg-h3LightBlue
    p-[8px]
    border-2
    border-black
    transition-colors
    duration-200
    ease-in-out
    ${className || ''}
  `;

  const Component = as;

  return (
    <Component className={classNames.trim()} {...rest}>
      {children}
    </Component>
  );
}
