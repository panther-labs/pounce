import { AbstractButtonProps } from '../AbstractButton';

export const secondaryButtonProps: AbstractButtonProps = {
  color: 'grey400',
  backgroundColor: 'grey50',
  textTransform: 'uppercase',
  _hover: {
    backgroundColor: 'grey100',
  },
  _active: {
    backgroundColor: 'grey200',
  },
};

export const defaultButtonProps: AbstractButtonProps = {
  color: 'grey400',
  bg: 'white',
  boxShadow: 'dark150',
  textTransform: 'uppercase',
  _hover: {
    boxShadow: 'dark200',
    backgroundColor: 'grey100',
  },
  _active: {
    boxShadow: 'none',
    backgroundColor: 'grey100',
  },
};

export const primaryButtonProps: AbstractButtonProps = {
  color: 'white',
  bg: 'primary300',
  boxShadow: 'dark150',
  textTransform: 'uppercase',
  _hover: {
    boxShadow: 'dark200',
    backgroundColor: 'primary300',
    opacity: 0.9,
  },
  _active: {
    boxShadow: 'none',
    backgroundColor: 'primary300',
  },
};
