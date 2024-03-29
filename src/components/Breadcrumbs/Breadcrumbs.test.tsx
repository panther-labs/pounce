import React from 'react';
import Breadcrumbs from './index';
import { fireEvent, renderWithTheme, waitFor } from '../../../jest/utils';

const mockCrumbs = [
  {
    children: 'First page',
    href: '/',
  },
  {
    children: 'Second page',
    href: '/secondpage',
  },
  {
    children: 'Third page',
    href: '/thirdpage',
  },
  {
    children: 'Fourth page',
    href: '/fourthpage',
  },
  {
    children: 'Fifth page',
    href: '/fifthpage',
  },
  {
    children: 'Sixth page',
    href: '/sixthpage',
  },
  {
    children: 'Seventh page',
    href: '/seventhpage',
  },
];
const truncatedCrumbs = mockCrumbs.slice(1, -2);
const visibleCrumbs = mockCrumbs.filter(index => {
  return truncatedCrumbs.indexOf(index) === -1;
});

describe('Breadcrumbs', () => {
  it('renders breadcrumbs without truncation', () => {
    const { queryAllByRole, queryByLabelText, queryByText } = renderWithTheme(
      <Breadcrumbs items={mockCrumbs} />
    );

    // verify expected breadcrumbs and chevrons exist
    mockCrumbs.forEach(crumb => {
      expect(queryByText(crumb.children)).toBeTruthy();
    });
    expect(queryAllByRole('presentation')).toHaveLength(mockCrumbs.length - 1);

    // verify truncated menu does not exist
    expect(queryByLabelText('Toggle additional breadcrumbs')).toBeNull();
  });

  it('renders breadcrumbs with truncation', () => {
    const { queryAllByRole, getByLabelText, queryByText } = renderWithTheme(
      <Breadcrumbs items={mockCrumbs} truncate />
    );

    // verify inital visible state
    visibleCrumbs.forEach(crumb => {
      expect(queryByText(crumb.children)).toBeTruthy();
    });
    truncatedCrumbs.forEach(crumb => {
      expect(queryByText(crumb.children)).toBeNull();
    });
    expect(queryAllByRole('presentation')).toHaveLength(3);

    // toggle truncated menu
    fireEvent.click(getByLabelText('Toggle additional breadcrumbs'));
    truncatedCrumbs.forEach(async crumb => {
      await waitFor(() => expect(queryByText(crumb.children)).toBeTruthy());
    });
  });

  it('renders breadcrumbs without truncation when list length is less than 4', () => {
    const { queryAllByRole, queryByLabelText, queryByText } = renderWithTheme(
      <Breadcrumbs items={visibleCrumbs} truncate />
    );

    // verify expected breadcrumbs and chevrons exist
    visibleCrumbs.forEach(crumb => {
      expect(queryByText(crumb.children)).toBeTruthy();
    });
    expect(queryAllByRole('presentation')).toHaveLength(visibleCrumbs.length - 1);

    // verify truncated menu does not exist
    expect(queryByLabelText('Toggle additional breadcrumbs')).toBeNull();
  });
});
