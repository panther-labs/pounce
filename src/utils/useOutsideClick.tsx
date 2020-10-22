import React from 'react';

interface UseOutsideClickProps {
  elements: (HTMLElement | null)[];
  callback: (event: MouseEvent) => void;
}

const useOutsideClick = ({ elements, callback }: UseOutsideClickProps) => {
  // Invoke a callback on clicks outside of those elements. We also add `capture` events to avoid
  // some race conditions on window-attached events
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      const isOutsideClick = elements.every(el => el && !el.contains(event.target as Element));
      if (isOutsideClick) {
        callback(event);
      }
    };

    window.addEventListener('mousedown', listener, { capture: true });
    return () => {
      window.removeEventListener('mousedown', listener, { capture: true });
    };
  }, [callback, ...elements]);
};

export default useOutsideClick;
