import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipesPage from '../components/RecipesPage';
import Header from '../components/Header';
import AddPage from '../components/AddPage';

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Route exact path="/" component={RecipesPage} />
      <Route path="/add" component={AddPage} />
    </React.Fragment>
  </Router>
);

export default AppRouter;
