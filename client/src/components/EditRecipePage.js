import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';

import { startEditRecipe } from './../actions/recipeActions';

class EditRecipePage extends React.Component {
  editRecipe = recipe => {
    const id = this.props.location.state.recipe._id;
    this.props.startEditRecipe(id, recipe, this.props.history);
  };

  render() {
    const recipe = this.props.location.state.recipe;
    return (
      <div className="container">
        <RecipeForm onSubmit={this.editRecipe} recipe={recipe} />
      </div>
    );
  }
}

EditRecipePage.propTypes = {};

const mapStateToProps = state => ({
  errors: state.errors,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { startEditRecipe }
)(EditRecipePage);
