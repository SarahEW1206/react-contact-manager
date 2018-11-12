import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";

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

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

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
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      marginRight: "20px",
                      color: "gray"
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo && (
                <ul className="list-group">
                  <li className="list-group-item">{phone}</li>
                  <li className="list-group-item">{email}</li>
                </ul>
              )}
              <Link to={`/contact/${id}`}>More Info</Link>
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
