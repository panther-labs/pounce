import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon';
import Box from '../Box';
import Link, { LinkProps } from '../Link';

export interface BreadcrumbItem {
  /** The URL that this Breadcrumbs should navigate to when clicked */
  href: string;

  /** The text that should be displayed on this particular Breadcrumb */
  text: string;
}

export interface BreadcrumbProps {
  /** A list of `BreadcrumbsItem` objects ( `{href,text}` ) that will construct the Breadcrumb */
  items: BreadcrumbItem[];

  /** The underlying HTML element */
  as?: LinkProps['as'];
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
                {item.text}
              </Link>
              {!isLastBreadcrumb && (
                <Icon
                  type="chevron-right"
                  mx={2}
                  color="blue-300"
                  size="small"
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
