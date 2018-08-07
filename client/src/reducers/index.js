import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import errorReducer from './errorReducer';
import dialogReducer from './dialogReducer';

export default combineReducers({
  recipes: recipeReducer,
  errors: errorReducer,
  dialog: dialogReducer
});
