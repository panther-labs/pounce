import React from 'react';
import styled from 'styled-components';
import Heading from 'components/Heading';
import Flex from 'components/Flex';
import Icon from 'components/Icon';

const StyledHeading = styled(Heading)`
  transition: color 0.1s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  * {
    text-decoration: none;
    color: inherit;
  }
`;

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
  itemRenderer?: (item: BreadcrumbItem) => React.ReactNode;
}

/** Breadcrumb is a way to navigate back to where you came from within the app */
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, itemRenderer }) => {
  return (
    <Flex is="ol">
      {items.map((item, index) => {
        const isLastBreadcrumb = index === items.length - 1;

        return (
          <Flex key={item.href} is="li" alignItems="center">
            <StyledHeading color={isLastBreadcrumb ? 'grey500' : 'grey300'} size="large">
              {itemRenderer && itemRenderer(item)}
            </StyledHeading>
            {!isLastBreadcrumb && <Icon type="chevron-right" mx={4} color="grey300" size="large" />}
          </Flex>
        );
      })}
    </Flex>
  );
};

Breadcrumbs.defaultProps = {
  // eslint-disable-next-line react/display-name
  itemRenderer: item => <a href={item.href}>{item.text}</a>,
};

export default Breadcrumbs;
