import { css } from '@emotion/react';
import { Theme } from 'hang-log-design-system';

export const wrapperStyling = css({
  width: '696px',
  minHeight: '528px',

  '@media screen and (max-width: 600px)': {
    width: `calc(100vw - ${Theme.spacer.spacing4})`,
    height: `calc(100vh - ${Theme.spacer.spacing7})`,
  },
});

export const formStyling = css({
  display: 'flex',
  flexDirection: 'column',
  gap: Theme.spacer.spacing4,

  '& > button': {
    width: '100%',
  },

  '@media screen and (max-width: 600px)': {
    width: `calc(100vw - ${Theme.spacer.spacing7})`,
    height: `calc(100vh - ${Theme.spacer.spacing8})`,

    overflowY: 'auto',
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
});
