import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

import Header from "./Header";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import SurveyNew from "./SurveyNew";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Landing} />
        <PrivateRoute path="/surveys" exact component={Dashboard} />
        <PrivateRoute path="/surveys/new" component={SurveyNew} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default connect(null, actions)(App);
