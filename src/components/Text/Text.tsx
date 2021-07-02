import { __DEV__ } from 'utils/helpers';
import { pounce } from 'system';

export type TextProps = React.ComponentProps<typeof Text>;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive typographic component. Anywhere you want to add some text that doesn't constitute a
 * heading or a title, this component is what you need.
 *
 * */
const Text = pounce('p');

export default Text;

if (__DEV__) {
  Text.displayName = 'Text';
}
