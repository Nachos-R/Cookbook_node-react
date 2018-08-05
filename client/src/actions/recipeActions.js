import axios from 'axios';

import { ADD_RECIPE, GET_ERRORS, SET_RECIPES, REMOVE_RECIPE } from './types';

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
