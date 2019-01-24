import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";

class Form extends Component {
  state = {
    location: ""
  };

  textInput = createRef();

  onChange = e => {
    const location = e.target.value;
    this.setState({ location });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { location } = { ...this.state };
    if (location.trim()) {
      this.forwardParams();
    } else {
      this.resetInput();
    }
  };

  forwardParams = () => {
    this.props.history.push({
      pathname: "/forecast",
      search: `?location=${this.state.location}`
    });
  };

  resetInput = () => {
    this.setState({ location: "" });
    this.textInput.current.focus();
  };

  render() {
    const { location, redirect } = this.state;

    if (redirect) {
      return this.renderRedirect();
    }

    return (
      <form style={this.props.style} onSubmit={this.onSubmit}>
        <input
          ref={this.textInput}
          type="text"
          placeholder="St. George, Utah"
          value={location}
          onChange={this.onChange}
          required
        />
        <button>Get Weather</button>
      </form>
    );
  }
}

export default withRouter(Form);
