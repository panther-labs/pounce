import { Theme } from '../theme';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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

export const isEmptyValue = (
  value?: string | number | Record<string, unknown> | readonly string[] | undefined
): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' && value === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

/**
 * Converts the provided date to a Dayjs object
 */
export const dateToDayjs = (value: Date | undefined, timezone: 'local' | 'utc' = 'local') => {
  if (!value) {
    return undefined;
  }
  return timezone === 'local' ? dayjs(value) : dayjs(value).utc();
};

/**
 * Get the current date time.
 * @returns {Dayjs} a Dayjs object
 */
export const now = (timezone: 'local' | 'utc' = 'local') => {
  return timezone === 'local' ? dayjs() : dayjs().utc();
};

/**
 * A function that generates a preset with dynamic dates.
 * @returns {Object} An object with Dayjs presets
 */

export const getDates = (
  timezone: 'local' | 'utc' = 'local'
): {
  now: Dayjs;
  lastDay: Dayjs;
  lastWeek: Dayjs;
  lastMonth: Dayjs;
  nextMonth: Dayjs;
  lastThreeMonths: Dayjs;
  lastSixMonths: Dayjs;
} => {
  const dateNow = now(timezone);
  const lastDay = dateNow.subtract(1, 'day');
  const lastWeek = dateNow.subtract(1, 'week');
  const lastMonth = dateNow.subtract(1, 'month');
  const nextMonth = dateNow.subtract(1, 'month');
  const lastThreeMonths = dateNow.subtract(3, 'month');
  const lastSixMonths = dateNow.subtract(6, 'month');
  return {
    now: dateNow,
    nextMonth,
    lastDay,
    lastWeek,
    lastMonth,
    lastThreeMonths,
    lastSixMonths,
  };
};
