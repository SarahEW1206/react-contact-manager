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

    let updatedContact = {
      id,
      name,
      email,
      phone
    };

    console.log(updatedContact);
    console.log(this.state);

    //Check for errors
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
      await axios.put(
        `http://jsonplaceholder.typicode.com/users/${id}`,
        updatedContact
      );

      dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });

      //Clear state (inputs) after submit
      this.setState({
        id: "",
        name: "",
        email: "",
        phone: "",
        errors: {}
      });

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
