declare module '@emotion/styled' {
  import { Theme } from 'themes/default';
  import { CreateStyled } from '@emotion/styled';
  export * from '@emotion/styled/types/index';

  const styled: CreateStyled<Theme>;
  export default styled;
}
