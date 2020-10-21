import React from 'react';

interface UseDisclosureProps {
  isOpen?: boolean;
}

const useDisclosure = ({ isOpen: isInitiallyOpen = false }: UseDisclosureProps = {}) => {
  const [isOpen, setIsOpen] = React.useState(isInitiallyOpen);

  const open = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  return React.useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [isOpen, open, close, toggle]
  );
};

export default useDisclosure;
