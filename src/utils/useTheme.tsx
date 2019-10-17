import { useTheme } from 'emotion-theming';
import { Theme } from 'themes/default';

/**
 * A React hook that allows to retrieve the theme within a functional component
 */
export default () => useTheme<Theme>();
