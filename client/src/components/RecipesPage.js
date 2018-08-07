import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Recipe from './Recipe';
import AlertDialog from './AlertDialog';
import { startSetRecipes } from './../actions/recipeActions';

class RecipesPage extends Component {
  componentWillMount() {
    this.props.startSetRecipes();
  }

  render() {
    return (
      <div className="container">
        {this.props.recipes.length > 0
          ? this.props.recipes.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} />
            ))
          : false}
        <AlertDialog />
      </div>
    );
  }
}

RecipesPage.propTypes = {
  startSetRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { startSetRecipes }
)(RecipesPage);
