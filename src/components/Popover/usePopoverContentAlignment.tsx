import { PopoverContentProps } from './PopoverContent';
import { Position } from '@reach/popover';
import { PRect } from '@reach/rect';

function getCollisions(targetRect: PRect, popoverRect: PRect) {
  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width,
    bottom: window.innerHeight < targetRect.bottom + popoverRect.height,
    left: targetRect.left + targetRect.width - popoverRect.width < 0,
  };
  const directionRight = !collisions.right && collisions.left;
  const directionLeft = !collisions.left && collisions.right;
  const directionUp = !collisions.top && collisions.bottom;
  const directionDown = !collisions.bottom && collisions.top;

  return {
    directionRight,
    directionLeft,
    directionUp,
    directionDown,
  };
}

export const positionBottomLeft = (offset: [number, number]): Position => (
  targetRect,
  popoverRect
) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionRight, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionRight
      ? `${targetRect.right - popoverRect.width + window.pageXOffset - offset[0]}px`
      : `${targetRect.left + window.pageXOffset + offset[0]}px`,
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset - offset[1]}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset + offset[1]}px`,
  };
};

export const positionBottomCenter = (offset: [number, number]): Position => (
  targetRect,
  popoverRect
) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionLeft, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionLeft
      ? `${targetRect.left + window.pageXOffset + offset[0]}px`
      : `${
          targetRect.right -
          popoverRect.width / 2 -
          targetRect.width / 2 +
          window.pageXOffset +
          offset[0]
        }px`,
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset - offset[1]}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset + offset[1]}px`,
  };
};

export const positionBottomRight = (offset: [number, number]): Position => (
  targetRect,
  popoverRect
) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionLeft, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionLeft
      ? `${targetRect.left + window.pageXOffset + offset[0]}px`
      : `${targetRect.right - popoverRect.width + window.pageXOffset - offset[0]}px`,
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset - offset[1]}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset + offset[1]}px`,
  };
};

export const positionLeftCenter = (offset: [number, number]): Position => (
  targetRect,
  popoverRect
) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionRight, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionRight
      ? `${targetRect.right + window.pageXOffset + offset[0]}px`
      : `${targetRect.left + window.pageXOffset - popoverRect.width - offset[0]}px`,
    top: directionUp
      ? `${targetRect.bottom - popoverRect.height + window.pageYOffset - offset[1]}px`
      : `${
          targetRect.bottom -
          popoverRect.height / 2 -
          targetRect.height / 2 +
          window.pageYOffset +
          offset[1]
        }px`,
  };
};

export const positionRightCenter = (offset: [number, number]): Position => (
  targetRect,
  popoverRect
) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionLeft, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionLeft
      ? `${targetRect.left + window.pageXOffset - popoverRect.width - offset[0]}px`
      : `${targetRect.right + window.pageXOffset + offset[0]}px`,
    top: directionUp
      ? `${targetRect.bottom - popoverRect.height + window.pageYOffset - offset[1]}px`
      : `${
          targetRect.bottom -
          popoverRect.height / 2 -
          targetRect.height / 2 +
          window.pageYOffset +
          offset[1]
        }px`,
  };
};

const usePopoverAlignment = ({
  alignment,
  offset,
}: Required<Pick<PopoverContentProps, 'alignment' | 'offset'>>): Position => {
  switch (alignment) {
    case 'bottom-left':
      return positionBottomLeft(offset);
    case 'bottom-center':
      return positionBottomCenter(offset);
    case 'left-center':
      return positionLeftCenter(offset);
    case 'right-center':
      return positionRightCenter(offset);
    case 'bottom-right':
    default:
      return positionBottomRight(offset);
  }
};

export default usePopoverAlignment;
