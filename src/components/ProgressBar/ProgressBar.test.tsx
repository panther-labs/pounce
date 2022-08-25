import React from 'react';
import { render } from 'test-utils';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders', async () => {
    const { container } = await render(
      <React.Fragment>
        <ProgressBar progress={0.5} />
        <ProgressBar progress={0.5} thickness={10} />
        <ProgressBar progress={0.5} color="teal-400" />
      </React.Fragment>
    );
    expect(container).toMatchSnapshot();
  });
});
