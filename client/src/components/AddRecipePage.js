import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';

import { startAddRecipe } from './../actions/recipeActions';

class AddPage extends React.Component {
  addRecipe = recipe => {
    this.props.startAddRecipe(recipe, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <RecipeForm onSubmit={this.addRecipe} />
      </div>
    );
  }
}

AddPage.propTypes = {};

const mapStateToProps = state => ({
  errors: state.errors,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { startAddRecipe }
)(AddPage);
