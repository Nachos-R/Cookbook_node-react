import { OPEN_DIALOG, CLOSE_DIALOG } from './../actions/types';

const initialState = { isOpen: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        isOpen: true,
        id: action.payload
      };
    case CLOSE_DIALOG:
      return {
        isOpen: false
      };
    default:
      return state;
  }
};
