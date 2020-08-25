import React from 'react';
import Box from '../Box';
import { NativeAttributes, SystemProps } from '../../system';

export interface ImgProps extends NativeAttributes<'img'>, SystemProps {
  /** The image URL */
  src: string;

  /** The fallback text of the image */
  alt: string;

  /** The native width of the image. Differs from `width` which is tied to the theme */
  nativeWidth?: number | string;

  /** The native height of the image. Differs from `height` which is tied to the theme  */
  nativeHeight?: number | string;
}

const NativeImg = React.forwardRef<HTMLImageElement, ImgProps>(function NativeImg(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { nativeWidth, nativeHeight, color, alt, ...props },
  ref
) {
  return <img {...props} ref={ref} width={nativeWidth} height={nativeHeight} alt={alt} />;
});

/**
 * Extends Box
 *
 * Simple Img component for whenever you want to add an image to your app
 */
export const Img = React.forwardRef<HTMLImageElement, ImgProps>(function Img(props, ref) {
  if (props.width && !props.nativeWidth) {
    console.warn('A width was specified for an image without a `nativeWidth` being defined');
  }

  if (props.height && !props.nativeHeight) {
    console.warn('A height was specified for an image without a `nativeHeight` being defined');
  }

  return (
    <Box
      as={NativeImg}
      ref={ref}
      maxWidth="100%"
      height={!props.nativeHeight ? 'auto' : undefined}
      {...props}
    />
  );
});

export default Img;
