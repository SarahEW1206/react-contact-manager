import React, { Component } from "react";
import { Consumer } from "../../context";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  // Can also do this and just set onChange on all inputs to this.
  //  onChange = e => this.setState({[e.target.name]: e.target.value})

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    dispatch({ type: "ADD_CONTACT", payload: this.state });
    //Clear state (inputs) after submit
    this.setState({
      name: "",
      email: "",
      phone: ""
    });
  };

  render() {
    const { name, phone, email } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter Email..."
                      value={email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="Enter Phone Number..."
                      value={phone}
                      onChange={e => this.setState({ phone: e.target.value })}
                    />
                  </div>
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
