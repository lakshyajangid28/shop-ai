import { useEffect, useRef } from 'react';

export function usePopoutPortal({ title = '', width = 600, height = 800 } = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const windowRef = useRef<Window | null>(null);

  useEffect(() => {
    return () => {
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    };
  }, []);

  function openPortal() {
    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.focus();
      return containerRef.current;
    }
    const left = window.screenX + 100;
    const top = window.screenY + 100;
    windowRef.current = window.open(
      '',
      '',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (!windowRef.current) return null;
    windowRef.current.document.title = title;
    windowRef.current.document.body.innerHTML = '<div id="popout-root"></div>';
    containerRef.current = windowRef.current.document.getElementById('popout-root') as HTMLDivElement;

    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    links.forEach(link => {
      const newLink = link.cloneNode(true) as HTMLLinkElement;
      windowRef.current!.document.head.appendChild(newLink);
    });

    const styles = Array.from(document.querySelectorAll('style'));
    styles.forEach(style => {
      const newStyle = style.cloneNode(true) as HTMLStyleElement;
      windowRef.current!.document.head.appendChild(newStyle);
    });

    return containerRef.current;
  }

  return { openPortal, containerRef, windowRef };
}
