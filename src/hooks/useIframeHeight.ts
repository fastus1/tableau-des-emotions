import { useEffect } from 'react';

const FALLBACK_HEIGHT = 900;

export function useIframeHeight() {
  useEffect(() => {
    const sendHeight = () => {
      try {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(
          { type: 'IFRAME_HEIGHT', height },
          '*'
        );
      } catch (e) {
        // postMessage failed, parent will use fallback
        console.warn('postMessage failed, parent should use fallback:', FALLBACK_HEIGHT);
      }
    };

    // Initial send after a brief delay to ensure content is rendered
    const initialTimeout = setTimeout(sendHeight, 100);

    // Watch for content changes
    const observer = new ResizeObserver(() => {
      sendHeight();
    });
    observer.observe(document.body);

    // Also send on window load
    window.addEventListener('load', sendHeight);

    return () => {
      clearTimeout(initialTimeout);
      observer.disconnect();
      window.removeEventListener('load', sendHeight);
    };
  }, []);
}
