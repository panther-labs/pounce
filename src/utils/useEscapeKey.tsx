import React from 'react';

interface UseEscapeKeyProps {
  callback: (event: React.KeyboardEvent) => void;
}

const useEscapeKey = ({ callback }: UseEscapeKeyProps) => {
  // Close on ESC key presses
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback(event);
      }
    },
    [callback]
  );

  return React.useMemo(() => ({ onKeyDown: handleKeyDown }), [handleKeyDown]);
};

export default useEscapeKey;
