import React from "react";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";

class About extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Consumer>
        {value => {
          const { contacts } = value;

          let filtered = contacts.filter(person => {
            return person.id.toString() === id.toString();
          });

          console.log(id);

          return (
            <div>
              {filtered.map(contact => (
                <div>
                  <h3>{contact.name}</h3>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                </div>
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default About;
