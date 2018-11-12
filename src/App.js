import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Contacts from "./components/contacts/Contacts";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import Header from "./components/layout/Header";
import AboutContact from "./components/contacts/AboutContact";
import About from "./components/pages/About";
import Test from "./components/pages/Test";
import NotFound from "./components/pages/NotFound";

import { Provider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Header branding="Contact Manager" />
            <p>
              This app, for the time being, makes HTTP requests to{" "}
              <a href="https://jsonplaceholder.typicode.com/">
                JSON Placeholder
              </a>
              , which means that you're not actually able to make any changes to
              backend data. You can edit create, edit* or delete a contact, but
              the changes will only stick around as long as the app is not
              refreshed. Stay tuned for 2.0!
            </p>
            <p>
              *You also can't edit any contact you add, because it's not part of
              the actual placeholder data.
            </p>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/test" component={Test} />
                <Route path="/contact/:id" component={AboutContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
