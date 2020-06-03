import { Position } from '@reach/popover';

export const positionRight: Position = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  // The distance from the bottom edge of the popover to the bottom edge of the trigger under
  // normal conditions. Thee popover is vertically centered with regards to the trigger
  const popoverEdgeToTriggerEdge = (popoverRect.height - targetRect.height) / 2;

  const collisions = {
    top: targetRect.top - popoverEdgeToTriggerEdge < 0,
    right: window.innerWidth < targetRect.left + targetRect.width + popoverRect.width,
    bottom: window.innerHeight < targetRect.bottom + popoverEdgeToTriggerEdge,
    left: targetRect.left - popoverRect.width < 0,
  };

  // Typically we center the popover around the trigger
  let top = targetRect.top - popoverEdgeToTriggerEdge + window.pageYOffset;
  if (collisions.top) {
    // pin to top on upper overflows
    top = window.pageYOffset;
  }
  if (collisions.bottom) {
    // pin to bottom on lower overflows
    top = window.innerHeight + window.pageYOffset - popoverRect.height;
  }

  // Always align to the right of the popover
  let left = targetRect.right;
  if (collisions.right) {
    // unless there is only space on the  left
    left = targetRect.left - popoverRect.width;
  }

  // We didn't handle what happens when there is no space neither on the left nor on the right.
  // This is an occasion with super small mobile devices coupled with big tooltip content. In
  // mobiles we don't show tooltips so we purposefully ignore this scenario

  return {
    left: left + 'px',
    top: top + 'px',
  };
};
