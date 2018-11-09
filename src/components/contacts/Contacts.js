import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span class="text-danger">Contact</span> List
              </h1>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
              <p>
                <Link to={"/add"}>Add a contact.</Link>
              </p>
              <p>
                <Link to={"/about"}>About this app.</Link>
              </p>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
