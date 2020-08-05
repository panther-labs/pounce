import { axe } from 'jest-axe';
import { ThenArg } from '@reach/utils';

export type AxeResults = ThenArg<ReturnType<typeof axe>>;
