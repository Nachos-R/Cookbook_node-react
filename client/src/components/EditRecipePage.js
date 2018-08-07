import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';
import isEmpty from './../validation/is-empty';
import { startEditRecipe } from './../actions/recipeActions';

class EditRecipePage extends React.Component {
  editRecipe = recipeData => {
    const { _id, versions } = this.props.location.state.recipe;
    if (!isEmpty(recipeData.name) && !isEmpty(recipeData.text)) {
      versions.unshift(recipeData);
    }
    const recipe = {
      ...recipeData,
      versions
    };
    this.props.startEditRecipe(_id, recipe, this.props.history);
  };

  render() {
    const recipe = this.props.location.state.recipe;
    return (
      <div className="container">
        <RecipeForm
          onSubmit={this.editRecipe}
          recipe={recipe}
          path={this.props.location.pathname}
        />
      </div>
    );
  }
}

EditRecipePage.propTypes = {
  startEditRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { startEditRecipe }
)(EditRecipePage);
