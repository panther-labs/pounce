import { theme, Theme } from '../theme';

/**
 *
 * @param hex A hex color string
 * @param opacity a value between [0,1]
 * @returns The rgba representation
 */
export function convertHexToRgba(hex: string, opacity: number) {
  const hexWithoutHash = hex.replace('#', '');
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
}

/**
 *
 * @param color A theme colorr
 * @param opacity a value between [0,1]
 * @returns A new color with opacity  added to it
 */
export function addOpacity(color: keyof Theme['colors'], opacity: number) {
  const hexWithoutHash = theme.colors[color].replace('#', '');
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})` as keyof Theme['colors'];
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
