import React from 'react';
import useDisclosure from 'utils/useDisclosure';
import { useId } from '@reach/auto-id';

interface PopoverContext {
  popoverId?: string;
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  popoverRef: React.RefObject<HTMLElement>;
}

export interface PopoverProps {
  /**
   * Whether the popover should be initially open
   */
  isOpen?: boolean;

  /**
   * The id of the popover. Helps setting up aria controls between popover content & trigger
   */
  id?: string;

  /**
   * @ignore
   */
  children:
    | React.ReactNode
    | ((
        renderProps: Pick<PopoverContext, 'isOpen' | 'open' | 'close' | 'toggle'>
      ) => React.ReactNode);
}

// @ts-ignore
const PopoverContext = React.createContext<PopoverContext>(undefined);
const usePopoverContext = () => React.useContext(PopoverContext);

const Popover: React.FC<PopoverProps> = ({ isOpen: isInitiallyOpen, id, children }) => {
  const { isOpen, close, open, toggle } = useDisclosure({ isOpen: isInitiallyOpen });
  const triggerRef = React.useRef(null);
  const popoverRef = React.useRef(null);
  const popoverId = useId(id);
  const contextValue = React.useMemo(
    () => ({
      popoverId,
      triggerRef,
      popoverRef,
      open,
      close,
      toggle,
      isOpen,
    }),
    [popoverId, triggerRef, popoverRef, close, toggle, isOpen]
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {/* @ts-ignore */}
      {typeof children === 'function' ? children({ isOpen, open, close, toggle }) : children}
    </PopoverContext.Provider>
  );
};

export { usePopoverContext };
export default Popover;
