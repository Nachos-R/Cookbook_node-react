import React, { Component } from 'react';
import { connect } from 'react-redux';

import Recipe from './Recipe';
import { startSetRecipes } from './../actions/recipeActions';

class RecipesPage extends Component {
  componentWillMount() {
    console.log('componentWillMount');
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { startSetRecipes }
)(RecipesPage);
