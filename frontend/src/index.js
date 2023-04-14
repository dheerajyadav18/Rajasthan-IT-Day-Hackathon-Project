import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'tw-elements';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Auth0Provider
    domain="dev-g372diz1v7npa52u.us.auth0.com"
    clientId="fgAcbcbaZN61JCB84pum6LmWxP1CwucL"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
 
        <App />
      
      </BrowserRouter>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
