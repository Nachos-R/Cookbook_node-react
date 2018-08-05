import { ADD_RECIPE, SET_RECIPES, REMOVE_RECIPE } from './../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return [...state, action.payload];
    case SET_RECIPES:
      return [...action.payload];
    case REMOVE_RECIPE:
      return state.filter(({ _id }) => _id !== action.id);
    default:
      return state;
  }
};
