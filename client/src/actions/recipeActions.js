import axios from 'axios';

import {
  ADD_RECIPE,
  GET_ERRORS,
  SET_RECIPES,
  REMOVE_RECIPE,
  EDIT_RECIPE
} from './types';

export const startAddRecipe = (data, history) => dispatch => {
  axios
    .post('/api/recipes', data)
    .then(recipeData => {
      dispatch(addRecipe(recipeData.data));
    })
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addRecipe = data => ({
  type: ADD_RECIPE,
  payload: data
});

export const startSetRecipes = () => dispatch => {
  axios
    .get('api/recipes')
    .then(res => {
      dispatch(setRecipes(res.data));
    })
    .catch(err => console.log(err));
};

export const setRecipes = recipes => ({
  type: SET_RECIPES,
  payload: recipes
});

export const startEditRecipe = (id, updates, history) => dispatch => {
  axios
    .post(`/api/recipes/${id}`, updates)
    .then(res => {
      dispatch(editRecipe(id, updates));
    })
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editRecipe = (id, updates) => ({
  type: EDIT_RECIPE,
  id,
  updates
});

export const startRemoveRecipe = id => dispatch => {
  axios
    .delete(`/api/recipes/${id}`)
    .then(res => {
      dispatch(removeRecipe(id));
    })
    .catch(err => console.log(err));
};

export const removeRecipe = id => ({
  type: REMOVE_RECIPE,
  id
});
