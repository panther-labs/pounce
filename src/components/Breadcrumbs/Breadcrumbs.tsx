import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon';
import Box from '../Box';
import PseudoBox from '../PseudoBox';

const defaultItemRenderer = (item: BreadcrumbItem) => (
  <PseudoBox
    as="a"
    href={item.href}
    color="inherit"
    _hover={{ textDecoration: 'underline' }}
    textDecoration="none"
  >
    {item.text}
  </PseudoBox>
);

export interface BreadcrumbItem {
  /** The URL that this Breadcrumbs should navigate to when clicked */
  href: string;

  /** The text that should be displayed on this particular Breadcrumb */
  text: string;
}

export interface BreadcrumbProps {
  /** A list of `BreadcrumbsItem` objects ( `{href,text}` ) that will construct the Breadcrumb */
  items: BreadcrumbItem[];

  /**
   * The component to render for each Breadcrumb. This provides an easy way to integrate with your
   * favourite router library (i.e. `reach-router`, `react-router`, etc.).
   */
  itemRenderer: (item: BreadcrumbItem) => React.ReactNode;
}

/** Breadcrumb is a way to navigate back to where you came from within the app */
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, itemRenderer = defaultItemRenderer }) => {
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
              {itemRenderer(item)}
              {!isLastBreadcrumb && (
                <Icon
                  type="chevron-right"
                  mx={2}
                  color="blue-400"
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
