import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon';
import Box from '../Box';
import Link, { LinkProps } from '../Link';

export interface BreadcrumbItem {
  /** The URL that this Breadcrumbs should navigate to when clicked */
  href: string;
  /** The react node that will be displayed on this particular Breadcrumb
   * children can be: numbers, strings, elements or an array (or fragment) containing these types.
   */
  children: React.ReactNode;
}

export interface BreadcrumbProps extends Pick<LinkProps, 'as'> {
  /** A list of `BreadcrumbsItem` objects ( `{href,children}` ) that will construct the Breadcrumb */
  items: BreadcrumbItem[];
}

/** Breadcrumb is a way to navigate back to where you came from within the app */
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, ...rest }) => {
  return (
    <Box as="nav" aria-label="Breadcrumbs">
      <Flex as="ol">
        {items.map((item, index) => {
          const isLastBreadcrumb = index === items.length - 1;

          return (
            <Flex
              key={item.href}
              as="li"
              alignItems="center"
              fontSize="medium"
              fontWeight={isLastBreadcrumb ? 'bold' : 'normal'}
              aria-current={isLastBreadcrumb ? 'page' : undefined}
            >
              <Link
                to={item.href}
                variant="neutral"
                border="none"
                truncated
                maxWidth="450px"
                data-active={isLastBreadcrumb ? true : undefined}
                {...rest}
              >
                {item.children}
              </Link>
              {!isLastBreadcrumb && (
                <Icon
                  type="chevron-right"
                  mx={2}
                  color="blue-300"
                  size="medium"
                  role="presentation"
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Breadcrumbs;
