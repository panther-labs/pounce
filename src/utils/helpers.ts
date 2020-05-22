// @ts-ignore
import shouldForwardProp from '@styled-system/should-forward-prop';
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

/**
 * A function that takes an object of props and separates the one belonging to the styled-system
 *
 * @param {object} props - A set of props
 * @returns {Array[object]} - An object containing the props belonging to
 * styled system and the second the props that didn't belong to it and were native to React and/or
 * HTML.
 */
export const separateStyledSystemProps = (props: object) => {
  const styledSystemProps = {};
  const nativeProps = {};

  Object.keys(props).forEach((key: string) => {
    if (shouldForwardProp(key)) {
      // @ts-ignore
      nativeProps[key] = props[key];
    } else {
      // @ts-ignore
      styledSystemProps[key] = props[key];
    }
  });

  return [styledSystemProps, nativeProps];
};
