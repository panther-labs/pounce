import React from 'react';
import { PRect } from '@reach/rect';

export type Position = (
  triggerElementRect?: PRect | null,
  floatingElementRect?: PRect | null,
  ...unstable_observableNodes: React.ReactNode[]
) => React.CSSProperties;

export type Alignment =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'left-bottom'
  | 'left-center'
  | 'left-top'
  | 'right-bottom'
  | 'right-center'
  | 'right-top';

type ForcedDirection = {
  forcedRightwards: boolean;
  forcedLeftwards: boolean;
  forcedUpwards: boolean;
  forcedDownwards: boolean;
};
type PositionFunction = (
  triggerElementRect: PRect,
  floatingElementRect: PRect,
  direction: ForcedDirection
) => string;

function getForcedDirection(
  triggerElementRect: PRect,
  floatingElementRect: PRect,
  alignment: Alignment
): ForcedDirection {
  let collisions;

  const isHorizontalAlignment = alignment.startsWith('left') || alignment.startsWith('right');
  const isCentralAlignment = alignment.endsWith('center');
  if (isHorizontalAlignment) {
    collisions = {
      top:
        triggerElementRect.top + triggerElementRect.height <
        (isCentralAlignment ? floatingElementRect.height / 2 : floatingElementRect.height),
      right: window.innerWidth < triggerElementRect.right + floatingElementRect.width,
      bottom:
        window.innerHeight <
        triggerElementRect.top +
          (isCentralAlignment ? floatingElementRect.height / 2 : floatingElementRect.height),
      left: triggerElementRect.left < floatingElementRect.width,
    };
  } else {
    collisions = {
      top: triggerElementRect.top - floatingElementRect.height < 0,
      right:
        window.innerWidth <
        triggerElementRect.left +
          (isCentralAlignment ? floatingElementRect.width / 2 : floatingElementRect.width),
      bottom: window.innerHeight < triggerElementRect.bottom + floatingElementRect.height,
      left:
        triggerElementRect.left +
          triggerElementRect.width -
          (isCentralAlignment ? floatingElementRect.width / 2 : floatingElementRect.width) <
        0,
    };
  }

  return {
    forcedRightwards: !collisions.right && collisions.left,
    forcedLeftwards: !collisions.left && collisions.right,
    forcedUpwards: !collisions.top && collisions.bottom,
    forcedDownwards: !collisions.bottom && collisions.top,
  };
}

const leftAlignmentLeft: PositionFunction = (triggerElementRect, floatingElementRect, direction) =>
  direction.forcedRightwards
    ? `${triggerElementRect.right + window.pageXOffset}px`
    : `${triggerElementRect.left + window.pageXOffset - floatingElementRect.width}px`;

const rightAlignmentLeft: PositionFunction = (triggerElementRect, floatingElementRect, direction) =>
  direction.forcedLeftwards
    ? `${triggerElementRect.left + window.pageXOffset - floatingElementRect.width}px`
    : `${triggerElementRect.right + window.pageXOffset}px`;

const bottomAlignmentTop: PositionFunction = (triggerElementRect, floatingElementRect, direction) =>
  direction.forcedUpwards
    ? `${triggerElementRect.top - floatingElementRect.height + window.pageYOffset}px`
    : `${triggerElementRect.top + triggerElementRect.height + window.pageYOffset}px`;

const topAlignmentTop: PositionFunction = (triggerElementRect, floatingElementRect, direction) =>
  direction.forcedDownwards
    ? `${triggerElementRect.top + triggerElementRect.height + window.pageYOffset}px`
    : `${triggerElementRect.top - floatingElementRect.height + window.pageYOffset}px`;

const horizontalTopAlignmentTop: PositionFunction = (
  triggerElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedDownwards
    ? `${triggerElementRect.top + window.pageYOffset}px`
    : `${triggerElementRect.bottom - floatingElementRect.height + window.pageYOffset}px`;

const horizontalBottomAlignmentTop: PositionFunction = (
  triggerElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedUpwards
    ? `${triggerElementRect.bottom - floatingElementRect.height + window.pageYOffset}px`
    : `${triggerElementRect.top + window.pageYOffset}px`;

const horizontalCenterAlignmentTop: PositionFunction = (
  triggerElementRect,
  floatingElementRect,
  direction
) => {
  if (direction.forcedUpwards) {
    return `${triggerElementRect.bottom - floatingElementRect.height + window.pageYOffset}px`;
  }
  if (direction.forcedDownwards) {
    return `${triggerElementRect.top + window.pageYOffset}px`;
  }
  return `${
    triggerElementRect.bottom -
    floatingElementRect.height / 2 -
    triggerElementRect.height / 2 +
    window.pageYOffset
  }px`;
};

const verticalLeftAlignmentLeft: PositionFunction = (
  triggerElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedRightwards
    ? `${triggerElementRect.left + window.pageXOffset}px`
    : `${triggerElementRect.right - floatingElementRect.width + window.pageXOffset}px`;

const verticalRightAlignmentLeft: PositionFunction = (
  triggerElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedLeftwards
    ? `${triggerElementRect.right - floatingElementRect.width + window.pageXOffset}px`
    : `${triggerElementRect.left + window.pageXOffset}px`;

const verticalCenterAlignmentLeft: PositionFunction = (
  triggerElementRect,
  floatingElementRect,
  direction
) => {
  if (direction.forcedLeftwards) {
    return `${triggerElementRect.right - floatingElementRect.width + window.pageXOffset}px`;
  }
  if (direction.forcedRightwards) {
    return `${triggerElementRect.right - triggerElementRect.width + window.pageXOffset}px`;
  }

  return `${
    triggerElementRect.right -
    floatingElementRect.width / 2 -
    triggerElementRect.width / 2 +
    window.pageXOffset
  }px`;
};

const useAlignment = (alignment: Alignment): Position => {
  return React.useCallback(
    (triggerElementRect, floatingElementRect) => {
      if (!triggerElementRect || !floatingElementRect) {
        return {};
      }

      const direction = getForcedDirection(triggerElementRect, floatingElementRect, alignment);
      switch (alignment) {
        case 'left-bottom':
          return {
            left: leftAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: horizontalBottomAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'left-center':
          return {
            left: leftAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: horizontalCenterAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'left-top':
          return {
            left: leftAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: horizontalTopAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'top-left':
          return {
            left: verticalLeftAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: topAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'top-center':
          return {
            left: verticalCenterAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: topAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'top-right':
          return {
            left: verticalRightAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: topAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'right-bottom':
          return {
            left: rightAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: horizontalBottomAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'right-center':
          return {
            left: rightAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: horizontalCenterAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'right-top':
          return {
            left: rightAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: horizontalTopAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'bottom-left':
          return {
            left: verticalLeftAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: bottomAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'bottom-center':
          return {
            left: verticalCenterAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: bottomAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
        case 'bottom-right':
        default:
          return {
            left: verticalRightAlignmentLeft(triggerElementRect, floatingElementRect, direction),
            top: bottomAlignmentTop(triggerElementRect, floatingElementRect, direction),
          };
      }
    },
    [alignment]
  );
};

export default useAlignment;
