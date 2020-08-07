import React from 'react';
import { render, act, waitFor, AxeResults, fireEvent } from 'test-utils';
import { axe } from 'jest-axe';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './index';

it('renders', () => {
  const { container } = render(
    <Tabs>
      <TabList>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>One</TabPanel>
        <TabPanel>Two</TabPanel>
      </TabPanels>
    </Tabs>
  );
  expect(container).toMatchSnapshot();
});

it('functions correctly by default', () => {
  const { getByText } = render(
    <Tabs>
      <TabList>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>One</TabPanel>
        <TabPanel>Two</TabPanel>
      </TabPanels>
    </Tabs>
  );

  expect(getByText('1')).toHaveAttribute('aria-selected', 'true');
  expect(getByText('One')).not.toHaveAttribute('hidden');
  expect(getByText('2')).toHaveAttribute('aria-selected', 'false');
  expect(getByText('Two')).toHaveAttribute('hidden');

  fireEvent.click(getByText('2'));

  expect(getByText('1')).toHaveAttribute('aria-selected', 'false');
  expect(getByText('One')).toHaveAttribute('hidden');
  expect(getByText('2')).toHaveAttribute('aria-selected', 'true');
  expect(getByText('Two')).not.toHaveAttribute('hidden');
});

it('correctly lazy loads', () => {
  const { getByText, queryByText } = render(
    <Tabs>
      <TabList>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>One</TabPanel>
        <TabPanel lazy>Two</TabPanel>
      </TabPanels>
    </Tabs>
  );

  expect(getByText('One')).toBeInTheDocument();
  expect(queryByText('Two')).toBeFalsy();

  fireEvent.click(getByText('2'));

  expect(getByText('One')).toBeInTheDocument();
  expect(getByText('Two')).toBeInTheDocument();
});

it('correctly lazy loads and unmounts when inactive', () => {
  const { getByText, queryByText } = render(
    <Tabs>
      <TabList>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel lazy unmountWhenInactive>
          One
        </TabPanel>
        <TabPanel lazy>Two</TabPanel>
      </TabPanels>
    </Tabs>
  );

  expect(getByText('One')).toBeInTheDocument();
  expect(queryByText('Two')).toBeFalsy();

  fireEvent.click(getByText('2'));

  expect(queryByText('One')).toBeFalsy();
  expect(getByText('Two')).toBeInTheDocument();
});

it('aligns with a11y', async () => {
  const { container } = render(
    <Tabs>
      <TabList>
        <Tab>1</Tab>
        <Tab>2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>One</TabPanel>
        <TabPanel>Two</TabPanel>
      </TabPanels>
    </Tabs>
  );
  let results: AxeResults;
  await act(async () => {
    results = await axe(container);
  });
  await waitFor(() => {
    expect(results).toHaveNoViolations();
  });
});
