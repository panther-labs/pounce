import React from 'react';

interface UseOutsideClickProps {
  refs: (React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>)[];
  callback: (event: MouseEvent) => void;
  disabled?: boolean;
}

const useOutsideClick = ({ refs, callback, disabled = false }: UseOutsideClickProps) => {
  // Invoke a callback on clicks outside of those elements. We also add `capture` events to avoid
  // some race conditions on window-attached events
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      const isOutsideClick = refs.every(
        ref => ref.current && !ref.current.contains(event.target as Element)
      );
      if (isOutsideClick) {
        callback(event);
      }
    };

    if (!disabled) {
      window.addEventListener('mousedown', listener, { capture: true });
    }
    return () => {
      if (!disabled) {
        window.removeEventListener('mousedown', listener, { capture: true });
      }
    };
  }, [callback, disabled, ...refs]);
};

export default useOutsideClick;
