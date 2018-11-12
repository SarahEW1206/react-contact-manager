import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { id, name, email, phone } = this.state;

    let errors = {};

    //It works to just pass state into the PUT request, but this eliminates the extra data we don't have to pass through (id, which stays the same, and errors).
    let updatedContact = {
      name,
      email,
      phone
    };

    console.log(updatedContact);
    console.log(this.state);

    //Check for errors
    //If ANY field is empty, go on to each field and if that field is empty, update the errors object with the respective error string.
    if (name === "" || email === "" || phone === "") {
      if (name === "") {
        errors.name = "Name is required.";
      }
      if (email === "") {
        errors.email = "Email is required.";
      }
      if (phone === "") {
        errors.phone = "Phone is required.";
      }
      //If any errors above, they will get pushed to the errors array, then we set errors in the state to the array.
      this.setState({ errors });
    } else {
      //If no errors, make the put request (using async await; sending through the updatedContact object)...
      try {
        const res = await axios.put(
          `http://jsonplaceholder.typicode.com/users/${id}`,
          updatedContact
        );
        //...and dispatch the update function with payload of response data from the PUT.
        dispatch({ type: "UPDATE_CONTACT", payload: res.data });
      } catch (error) {
        alert("Contact not found in database. " + error);
      }

      //Clear state (inputs) after submit
      this.setState({
        id: "",
        name: "",
        email: "",
        phone: "",
        errors: {}
      });

      //Redirect user back to the main page WITHOUT refreshing the app.
      this.props.history.push("/");
    }
  };

  render() {
    const { name, phone, email, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-dark"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
