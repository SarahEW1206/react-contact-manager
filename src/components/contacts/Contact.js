import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";

class Contact extends Component {
  //DON'T NEED TO DO ALL THIS IF WE MAKE THE FUNCTION AN ARROW FUNCTION.
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     clicked: true
  //   };

  //   this.onShowClick = this.onShowClick.bind(this);
  // }

  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    //Niiiiceee.
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  // onDeleteClick = (id, dispatch) => {
  //   dispatch({ type: "DELETE_CONTACT", payload: id });
  // };

  render() {
    //This is called destructuring!
    const { name, email, phone, id } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={() =>
                    dispatch({ type: "DELETE_CONTACT", payload: id })
                  }
                />
              </h4>
              {showContactInfo && (
                <ul className="list-group">
                  <li className="list-group-item">{phone}</li>
                  <li className="list-group-item">{email}</li>
                </ul>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
