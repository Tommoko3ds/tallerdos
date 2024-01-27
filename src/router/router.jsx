import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Header from '../componentes/header';
import ListadeTrabajos from '../componentes/paginas/dashboard';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
       
      </Switch>
      <Switch>
        <Route exact path="/" component={Header} />
       
      </Switch>
      <Switch>
        <Route exact path="/" component={ListadeTrabajos} />
       
      </Switch>
    </Router>
  );
};

export default AppRouter;
