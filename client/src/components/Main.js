import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import SavedArticles from './SavedArticles';
import Login from './Login';
import Register from './Register';

const Main = (props) => (
  <main>
    <Switch>
      <Route exact path="/" render={() => <Dashboard user={props.user} />} />
      <Route exact path="/articles" render={() => <SavedArticles user={props.user} />} />
      <Route exact path="/users/register" component={Register} />
      <Route exact path="/users/login" render={() => (
        props.user.name === undefined ?
          <Login user={props.user} handleAuthentication={props.handleAuthentication} error={props.error} /> :
          <Redirect to="/" />
      )} />
    </Switch>
  </main>
);

export default Main;