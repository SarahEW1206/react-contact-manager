import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    let errors = {};

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
      this.setState({ errors });
    } else {
      //Make the post request

      const newContact = {
        name,
        email,
        phone
      };

      const res = await axios.post(
        "http://jsonplaceholder.typicode.com/users",
        newContact
      );

      dispatch({ type: "ADD_CONTACT", payload: res.data });

      //Clear state (inputs) after submit
      this.setState({
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
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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

export default AddContact;
