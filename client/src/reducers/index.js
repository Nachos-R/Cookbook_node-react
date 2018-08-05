import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  recipes: recipeReducer,
  errors: errorReducer
});
