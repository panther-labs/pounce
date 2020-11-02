import React from 'react';
import { PopoverContentProps } from './PopoverContent';
import { Position } from '@reach/popover';
import { PRect } from '@reach/rect';

type AlignmentValue = Required<PopoverContentProps>['alignment'];
type ForcedDirection = {
  forcedRightwards: boolean;
  forcedLeftwards: boolean;
  forcedUpwards: boolean;
  forcedDownwards: boolean;
};
type PositionFunction = (
  targetRect: PRect,
  popoverRect: PRect,
  direction: ForcedDirection
) => string;

function getForcedDirection(
  targetRect: PRect,
  popoverRect: PRect,
  alignment: AlignmentValue
): ForcedDirection {
  let collisions;

  const isHorizontalAlignment = alignment.startsWith('left') || alignment.startsWith('right');
  if (isHorizontalAlignment) {
    collisions = {
      top: targetRect.top + targetRect.height < popoverRect.height,
      right: window.innerWidth < targetRect.right + popoverRect.width,
      bottom: window.innerHeight < targetRect.top + popoverRect.height,
      left: targetRect.left < popoverRect.width,
    };
  } else {
    collisions = {
      top: targetRect.top - popoverRect.height < 0,
      right: window.innerWidth < targetRect.left + popoverRect.width,
      bottom: window.innerHeight < targetRect.bottom + popoverRect.height,
      left: targetRect.left + targetRect.width - popoverRect.width < 0,
    };
  }

  return {
    forcedRightwards: !collisions.right && collisions.left,
    forcedLeftwards: !collisions.left && collisions.right,
    forcedUpwards: !collisions.top && collisions.bottom,
    forcedDownwards: !collisions.bottom && collisions.top,
  };
}

const leftAlignmentLeft: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedRightwards
    ? `${targetRect.right + window.pageXOffset}px`
    : `${targetRect.left + window.pageXOffset - popoverRect.width}px`;

const rightAlignmentLeft: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedLeftwards
    ? `${targetRect.left + window.pageXOffset - popoverRect.width}px`
    : `${targetRect.right + window.pageXOffset}px`;

const bottomAlignmentTop: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedUpwards
    ? `${targetRect.top - popoverRect.height + window.pageYOffset}px`
    : `${targetRect.top + targetRect.height + window.pageYOffset}px`;

const topAlignmentTop: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedDownwards
    ? `${targetRect.top + targetRect.height + window.pageYOffset}px`
    : `${targetRect.top - popoverRect.height + window.pageYOffset}px`;

const horizontalTopAlignmentTop: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedDownwards
    ? `${targetRect.top + window.pageYOffset}px`
    : `${targetRect.bottom - popoverRect.height + window.pageYOffset}px`;

const horizontalBottomAlignmentTop: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedUpwards
    ? `${targetRect.bottom - popoverRect.height + window.pageYOffset}px`
    : `${targetRect.top + window.pageYOffset}px`;

const horizontalCenterAlignmentTop: PositionFunction = (targetRect, popoverRect, direction) => {
  if (direction.forcedUpwards) {
    return `${targetRect.bottom - popoverRect.height + window.pageYOffset}px`;
  }
  if (direction.forcedDownwards) {
    return `${targetRect.top + window.pageYOffset}px`;
  }
  return `${
    targetRect.bottom - popoverRect.height / 2 - targetRect.height / 2 + window.pageYOffset
  }px`;
};

const verticalLeftAlignmentLeft: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedRightwards
    ? `${targetRect.left + window.pageXOffset}px`
    : `${targetRect.right - popoverRect.width + window.pageXOffset}px`;

const verticalRightAlignmentLeft: PositionFunction = (targetRect, popoverRect, direction) =>
  direction.forcedLeftwards
    ? `${targetRect.right - popoverRect.width + window.pageXOffset}px`
    : `${targetRect.left + window.pageXOffset}px`;

const verticalCenterAlignmentLeft: PositionFunction = (targetRect, popoverRect, direction) => {
  if (direction.forcedLeftwards) {
    return `${targetRect.right - popoverRect.width + window.pageXOffset}px`;
  }
  if (direction.forcedRightwards) {
    return `${targetRect.right - targetRect.width + window.pageXOffset}px`;
  }

  return `${
    targetRect.right - popoverRect.width / 2 - targetRect.width / 2 + window.pageXOffset
  }px`;
};

const usePopoverAlignment = (alignment: AlignmentValue): Position => {
  return React.useCallback(
    (targetRect, popoverRect) => {
      if (!targetRect || !popoverRect) {
        return {};
      }

      const direction = getForcedDirection(targetRect, popoverRect, alignment);
      switch (alignment) {
        case 'left-bottom':
          return {
            left: leftAlignmentLeft(targetRect, popoverRect, direction),
            top: horizontalBottomAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'left-center':
          return {
            left: leftAlignmentLeft(targetRect, popoverRect, direction),
            top: horizontalCenterAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'left-top':
          return {
            left: leftAlignmentLeft(targetRect, popoverRect, direction),
            top: horizontalTopAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'top-left':
          return {
            left: verticalLeftAlignmentLeft(targetRect, popoverRect, direction),
            top: topAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'top-center':
          return {
            left: verticalCenterAlignmentLeft(targetRect, popoverRect, direction),
            top: topAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'top-right':
          return {
            left: verticalRightAlignmentLeft(targetRect, popoverRect, direction),
            top: topAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'right-bottom':
          return {
            left: rightAlignmentLeft(targetRect, popoverRect, direction),
            top: horizontalBottomAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'right-center':
          return {
            left: rightAlignmentLeft(targetRect, popoverRect, direction),
            top: horizontalCenterAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'right-top':
          return {
            left: rightAlignmentLeft(targetRect, popoverRect, direction),
            top: horizontalTopAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'bottom-left':
          return {
            left: verticalLeftAlignmentLeft(targetRect, popoverRect, direction),
            top: bottomAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'bottom-center':
          return {
            left: verticalCenterAlignmentLeft(targetRect, popoverRect, direction),
            top: bottomAlignmentTop(targetRect, popoverRect, direction),
          };
        case 'bottom-right':
        default:
          return {
            left: verticalRightAlignmentLeft(targetRect, popoverRect, direction),
            top: bottomAlignmentTop(targetRect, popoverRect, direction),
          };
      }
    },
    [alignment]
  );
};

export default usePopoverAlignment;
