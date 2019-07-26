/**
 *
 * @param hex A hex color string
 * @param opacity a value between [0,1]
 * @returns The rgba representation
 */
export function convertHex(hex: string, opacity: number) {
  const hexWithoutHash = hex.replace('#', '');
  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexWithoutHash.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
}
