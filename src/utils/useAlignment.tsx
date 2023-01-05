import React from 'react';
import { PRect } from '@reach/rect';

export type Position = (
  anchorElementRect?: PRect | null,
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
  anchorElementRect: PRect,
  floatingElementRect: PRect,
  direction: ForcedDirection
) => string;

function getForcedDirection(
  anchorElementRect: PRect,
  floatingElementRect: PRect,
  alignment: Alignment
): ForcedDirection {
  let collisions;

  const isHorizontalAlignment = alignment.startsWith('left') || alignment.startsWith('right');
  const isCentralAlignment = alignment.endsWith('center');
  if (isHorizontalAlignment) {
    collisions = {
      top:
        anchorElementRect.top + anchorElementRect.height <
        (isCentralAlignment ? floatingElementRect.height / 2 : floatingElementRect.height),
      right: window.innerWidth < anchorElementRect.right + floatingElementRect.width,
      bottom:
        window.innerHeight <
        anchorElementRect.top +
          (isCentralAlignment ? floatingElementRect.height / 2 : floatingElementRect.height),
      left: anchorElementRect.left < floatingElementRect.width,
    };
  } else {
    collisions = {
      top: anchorElementRect.top - floatingElementRect.height < 0,
      right:
        window.innerWidth <
        anchorElementRect.left +
          (isCentralAlignment ? floatingElementRect.width / 2 : floatingElementRect.width),
      bottom: window.innerHeight < anchorElementRect.bottom + floatingElementRect.height,
      left:
        anchorElementRect.left +
          anchorElementRect.width -
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

const leftAlignmentLeft: PositionFunction = (anchorElementRect, floatingElementRect, direction) =>
  direction.forcedRightwards
    ? `${anchorElementRect.right + window.pageXOffset}px`
    : `${anchorElementRect.left + window.pageXOffset - floatingElementRect.width}px`;

const rightAlignmentLeft: PositionFunction = (anchorElementRect, floatingElementRect, direction) =>
  direction.forcedLeftwards
    ? `${anchorElementRect.left + window.pageXOffset - floatingElementRect.width}px`
    : `${anchorElementRect.right + window.pageXOffset}px`;

const bottomAlignmentTop: PositionFunction = (anchorElementRect, floatingElementRect, direction) =>
  direction.forcedUpwards
    ? `${anchorElementRect.top - floatingElementRect.height + window.pageYOffset}px`
    : `${anchorElementRect.top + anchorElementRect.height + window.pageYOffset}px`;

const topAlignmentTop: PositionFunction = (anchorElementRect, floatingElementRect, direction) =>
  direction.forcedDownwards
    ? `${anchorElementRect.top + anchorElementRect.height + window.pageYOffset}px`
    : `${anchorElementRect.top - floatingElementRect.height + window.pageYOffset}px`;

const horizontalTopAlignmentTop: PositionFunction = (
  anchorElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedDownwards
    ? `${anchorElementRect.top + window.pageYOffset}px`
    : `${anchorElementRect.bottom - floatingElementRect.height + window.pageYOffset}px`;

const horizontalBottomAlignmentTop: PositionFunction = (
  anchorElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedUpwards
    ? `${anchorElementRect.bottom - floatingElementRect.height + window.pageYOffset}px`
    : `${anchorElementRect.top + window.pageYOffset}px`;

const horizontalCenterAlignmentTop: PositionFunction = (
  anchorElementRect,
  floatingElementRect,
  direction
) => {
  if (direction.forcedUpwards) {
    return `${anchorElementRect.bottom - floatingElementRect.height + window.pageYOffset}px`;
  }
  if (direction.forcedDownwards) {
    return `${anchorElementRect.top + window.pageYOffset}px`;
  }
  return `${
    anchorElementRect.bottom -
    floatingElementRect.height / 2 -
    anchorElementRect.height / 2 +
    window.pageYOffset
  }px`;
};

const verticalLeftAlignmentLeft: PositionFunction = (
  anchorElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedRightwards
    ? `${anchorElementRect.left + window.pageXOffset}px`
    : `${anchorElementRect.right - floatingElementRect.width + window.pageXOffset}px`;

const verticalRightAlignmentLeft: PositionFunction = (
  anchorElementRect,
  floatingElementRect,
  direction
) =>
  direction.forcedLeftwards
    ? `${anchorElementRect.right - floatingElementRect.width + window.pageXOffset}px`
    : `${anchorElementRect.left + window.pageXOffset}px`;

const verticalCenterAlignmentLeft: PositionFunction = (
  anchorElementRect,
  floatingElementRect,
  direction
) => {
  if (direction.forcedLeftwards) {
    return `${anchorElementRect.right - floatingElementRect.width + window.pageXOffset}px`;
  }
  if (direction.forcedRightwards) {
    return `${anchorElementRect.right - anchorElementRect.width + window.pageXOffset}px`;
  }

  return `${
    anchorElementRect.right -
    floatingElementRect.width / 2 -
    anchorElementRect.width / 2 +
    window.pageXOffset
  }px`;
};

const useAlignment = (alignment: Alignment): Position => {
  return React.useCallback(
    (anchorElementRect, floatingElementRect) => {
      if (!anchorElementRect || !floatingElementRect) {
        return {};
      }

      const direction = getForcedDirection(anchorElementRect, floatingElementRect, alignment);
      switch (alignment) {
        case 'left-bottom':
          return {
            left: leftAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: horizontalBottomAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'left-center':
          return {
            left: leftAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: horizontalCenterAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'left-top':
          return {
            left: leftAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: horizontalTopAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'top-left':
          return {
            left: verticalLeftAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: topAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'top-center':
          return {
            left: verticalCenterAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: topAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'top-right':
          return {
            left: verticalRightAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: topAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'right-bottom':
          return {
            left: rightAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: horizontalBottomAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'right-center':
          return {
            left: rightAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: horizontalCenterAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'right-top':
          return {
            left: rightAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: horizontalTopAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'bottom-left':
          return {
            left: verticalLeftAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: bottomAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'bottom-center':
          return {
            left: verticalCenterAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: bottomAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
        case 'bottom-right':
        default:
          return {
            left: verticalRightAlignmentLeft(anchorElementRect, floatingElementRect, direction),
            top: bottomAlignmentTop(anchorElementRect, floatingElementRect, direction),
          };
      }
    },
    [alignment]
  );
};

export default useAlignment;
