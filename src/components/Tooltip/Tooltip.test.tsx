import React from 'react';
import { fireClickAndMouseEvents, fireEvent, renderWithTheme } from 'test-utils';
import Tooltip from './Tooltip';
import Box from '../Box';
import IconButton from '../IconButton';

const TooltipWrapper: React.FC = ({ children }) => {
  return (
    <Box
      position="relative"
      borderRadius="medium"
      bg="black"
      p={2}
      m={2}
      fontSize="small"
      boxShadow="dark250"
      __before={{
        content: '""',
        position: 'absolute',
        right: '100%',
        top: '50%',
        borderWidth: '6px',
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        borderRightColor: 'black',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        transform: 'translateY(-50%)',
      }}
    >
      {children}
    </Box>
  );
};

describe('Tooltip', () => {
  it('matches snapshot for tooltip', () => {
    const { container } = renderWithTheme(
      <Tooltip content="Lorem ipsum dolor sit amet, consectetur">
        <Box>Hover me to see the tooltip</Box>
      </Tooltip>
    );

    expect(container).toMatchSnapshot();
  });

  it('shows the tooltip when we hover', async () => {
    const { getByText, findByText } = renderWithTheme(
      <Tooltip content="Boom! I am the tooltip">
        <Box>Hover me to see the tooltip</Box>
      </Tooltip>
    );

    const textToHover = getByText('Hover me to see the tooltip');
    expect(textToHover).toBeInTheDocument();
    fireClickAndMouseEvents(textToHover);
    fireEvent.mouseOver(textToHover);
    expect(await findByText('Boom! I am the tooltip')).toBeInTheDocument();
  });

  it('shows the tooltip with an Icon', async () => {
    const { getByLabelText, findByText } = renderWithTheme(
      <Tooltip content="Boom! I am the user!">
        <IconButton icon="user" aria-label="See user" />
      </Tooltip>
    );

    const textToHover = getByLabelText('See user');
    expect(textToHover).toBeInTheDocument();
    fireClickAndMouseEvents(textToHover);
    fireEvent.mouseOver(textToHover);
    expect(await findByText('Boom! I am the user!')).toBeInTheDocument();
  });

  it('shows the tooltip with a custom content', async () => {
    const { getByText, findByText } = renderWithTheme(
      <Tooltip content="Lorem ipsum dolor sit amet, consectetur" wrapper={TooltipWrapper}>
        <Box>Hover me to see the new wrapper</Box>
      </Tooltip>
    );

    const textToHover = getByText('Hover me to see the new wrapper');
    expect(textToHover).toBeInTheDocument();
    fireClickAndMouseEvents(textToHover);
    fireEvent.mouseOver(textToHover);
    const tooltip = await findByText('Lorem ipsum dolor sit amet, consectetur');
    expect(tooltip).toHaveStyle('background-color: rgb(0, 0, 0)');
  });
});
