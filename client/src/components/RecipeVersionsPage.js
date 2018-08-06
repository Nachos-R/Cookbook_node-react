import React from 'react';
import Recipe from './Recipe';

const RecipeVersionsPage = props => {
  const {
    recipe: { versions, date }
  } = props.location.state;
  return (
    <div className="container">
      {versions.map((recipe, index) => (
        <Recipe key={index} recipe={{ ...recipe, date }} />
      ))}
    </div>
  );
};

export default RecipeVersionsPage;
