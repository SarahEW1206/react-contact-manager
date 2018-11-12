import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [
          {
            ...action.payload
          },
          ...state.contacts
        ]
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: [
          action.payload,
          ...state.contacts.filter(contact => contact.id !== action.payload.id)
        ]
        //This is how it's done in the video, this will not change the order like it does above. Depends what you want.
        // contacts: state.contacts.map(contact => contact.id===action.payload.id ? (contact = action.payload) : contact)
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const res = await axios.get("http://jsonplaceholder.typicode.com/users");

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
