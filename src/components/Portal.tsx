import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode; }) {
  const [host, setHost] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    setHost(div);

    return () => {
      div.remove();
    };
  }, []);

  if (!host) return null;

  return createPortal(children, host);
}
