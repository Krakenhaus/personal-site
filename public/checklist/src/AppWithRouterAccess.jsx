import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import AnimalCrossing from "./animalcrossing";
import Home from "./home";
import MarketPrices from "./marketprices";
import Login from "./marketprices/Components/Login/Login";
import {
  oktaAuthConfig,
  oktaSignInConfig,
} from "./marketprices/Components/Login/config";

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    try {
      // TODO: This function blows up way too much, look into it
      history.replace(toRelativeUrl(originalUri, window.location.origin));
    } catch (err) {
      history.replace(originalUri);
    }
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <Route exact path="/login">
          <Login config={oktaSignInConfig} />
        </Route>
        <Route path="/login/callback">
          <LoginCallback />
        </Route>
        <Route path="/animalcrossing">
          <AnimalCrossing />
        </Route>
        <SecureRoute path="/tcgmarketprices">
          <MarketPrices />
        </SecureRoute>
        <SecureRoute path="/members/tcgmarketprices">
          <MarketPrices />
        </SecureRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
