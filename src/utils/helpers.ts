import { Theme } from '../theme';
import React from 'react';

/** A boolean denoting whether we are in a development environment */
export const __DEV__ = process.env.NODE_ENV !== 'production';

/**
 * A function that implements the typical React.memo, but properly forwards TS generics
 */
export const typedMemo: <T>(c: T) => T = React.memo;

/**
 *
 * @param color A theme color
 * @param opacity a value between [0,1]
 * @returns A new color with opacity  added to it
 */
export function addOpacity(color: string, opacity: number) {
  const hexWithoutHash = color.replace('#', '');
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})` as keyof Theme['colors'];
}

/**
 * A function that takes a color and a positive or negative [0,1] amount and lightens it or darkens
 * it by this amount. Positive numbers lighten the color, while negatives darken i
 *
 * @param color A color
 * @param percentage A percentage by which to lighten/darken
 * @returns A new color with opacity  added to it
 */
export function lightenDarkenColor(color: string, percentage: number) {
  const getHue = (color: string) => parseInt(color, 16);
  const restrictHue = (hue: number) => Math.max(Math.min(hue, 255), 0);

  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, color =>
        ('0' + restrictHue(getHue(color) + percentage).toString(16)).substr(-2)
      )
  );
}

/**
 * A function that takes a text and returns a valid slug for it. Useful for filename and url
 * creation
 *
 * @param {String} text A string to slugify
 * @returns {String} A slugified string
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * @returns True if current environment is a browser, false in any other case
 */
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const noop = (): void => {};
