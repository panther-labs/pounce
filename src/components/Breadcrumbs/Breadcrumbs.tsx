import React from 'react';
import AbstractButton from '../AbstractButton';
import Box from '../Box';
import Card from '../Card';
import Flex from '../Flex';
import Icon from '../Icon';
import Link, { LinkProps } from '../Link';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

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
  /** Truncates component if breadcrumb list is too long.
   * At least 4 breadcrumbs must exist for truncation to occur.
   */
  truncate?: boolean;
}

interface IBreadcrumbLink {
  crumb: BreadcrumbItem;
  isLastBreadcrumb?: boolean;
  showChevron?: boolean;
}

type ITruncatedBreadcrumbs = Omit<BreadcrumbProps, 'truncate'>;

const BreadcrumbChevron: React.ElementType = () => {
  return <Icon type="chevron-right" mx={2} color="blue-300" size="medium" role="presentation" />;
};

const BreadcrumbLink: React.ElementType = ({
  crumb,
  isLastBreadcrumb = false,
  showChevron = true,
  ...rest
}: IBreadcrumbLink) => {
  return (
    <Flex
      key={crumb.href}
      as="li"
      alignItems="center"
      fontSize="medium"
      fontWeight={isLastBreadcrumb ? 'bold' : 'normal'}
      aria-current={isLastBreadcrumb ? 'page' : undefined}
    >
      <Link
        to={crumb.href}
        variant="neutral"
        border="none"
        truncated
        maxWidth="450px"
        data-active={isLastBreadcrumb ? true : undefined}
        {...rest}
      >
        {crumb.children}
      </Link>
      {!isLastBreadcrumb && showChevron && <BreadcrumbChevron />}
    </Flex>
  );
};

const TruncatedBreadcrumbs: React.ElementType = ({ items, ...rest }: ITruncatedBreadcrumbs) => {
  const firstItem = items[0];
  const truncatedList = items.slice(1, -2);
  const remainingCrumbs = items.slice(-2);

  return (
    <React.Fragment>
      {/* first crumb */}
      <BreadcrumbLink crumb={firstItem} {...rest} />

      {/* truncated crumbs */}
      <Popover>
        {() => (
          <Flex as="li" alignItems="center">
            <PopoverTrigger
              as={AbstractButton}
              variantColor="transparent"
              padding={0}
              height="auto"
              aria-label="Toggle additional breadcrumbs"
            >
              ...
            </PopoverTrigger>
            <PopoverContent alignment="bottom-right">
              <Card as="ul" my={1} px={5} pt={5} shadow="dark300" minWidth={180}>
                {truncatedList.map(item => {
                  return (
                    <BreadcrumbLink
                      key={item.href}
                      pb={5}
                      width="100%"
                      crumb={item}
                      showChevron={false}
                      {...rest}
                    />
                  );
                })}
              </Card>
            </PopoverContent>
            <BreadcrumbChevron />
          </Flex>
        )}
      </Popover>

      {/* remaining crumbs */}
      {remainingCrumbs.map((item, index) => {
        const isLastBreadcrumb = index === 1;
        return (
          <BreadcrumbLink
            key={item.href}
            crumb={item}
            isLastBreadcrumb={isLastBreadcrumb}
            {...rest}
          />
        );
      })}
    </React.Fragment>
  );
};

/** Breadcrumb is a way to navigate back to where you came from within the app */
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, truncate = false, ...rest }) => {
  const truncateBreadcrumbs = truncate && items.length > 3;

  return (
    <Box as="nav" aria-label="Breadcrumbs">
      <Flex as="ul">
        {truncateBreadcrumbs ? (
          <TruncatedBreadcrumbs items={items} {...rest} />
        ) : (
          <React.Fragment>
            {items.map((item, index) => {
              const isLastBreadcrumb = index === items.length - 1;
              return (
                <BreadcrumbLink
                  key={item.href}
                  crumb={item}
                  isLastBreadcrumb={isLastBreadcrumb}
                  {...rest}
                />
              );
            })}
          </React.Fragment>
        )}
      </Flex>
    </Box>
  );
};

export default Breadcrumbs;
