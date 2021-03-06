import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipesPage from '../components/RecipesPage';
import Header from '../components/Header';
import AddRecipePage from '../components/AddRecipePage';
import EditRecipePage from '../components/EditRecipePage';
import RecipeVersionsPage from '../components/RecipeVersionsPage';

// don't forget to add /:id
const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Route exact path="/" component={RecipesPage} />

      <Route path="/add" component={AddRecipePage} />
      <Route path="/edit" component={EditRecipePage} />
      <Route path="/versions" component={RecipeVersionsPage} />
    </React.Fragment>
  </Router>
);

export default AppRouter;
