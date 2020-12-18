import React from 'react';

interface UseEscapeKeyProps {
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>;
  callback: (event: KeyboardEvent) => void;
  disabled?: boolean;
}

const useEscapeKey = ({ ref, callback, disabled = false }: UseEscapeKeyProps) => {
  const listener = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.contains(event.target as HTMLElement)) {
        callback(event);
      }
    },
    [callback, ref]
  );

  React.useEffect(() => {
    if (!disabled) {
      window.addEventListener('keydown', listener);
    }
    return () => {
      if (!disabled) {
        window.removeEventListener('keydown', listener);
      }
    };
  }, [disabled, listener]);
};

export default useEscapeKey;
