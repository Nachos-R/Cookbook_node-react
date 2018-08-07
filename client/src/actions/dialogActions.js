import { OPEN_DIALOG, CLOSE_DIALOG } from './types';

export const openDialog = id => ({
  type: OPEN_DIALOG,
  payload: id
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});
