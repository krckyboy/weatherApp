import React, { Component, createRef } from "react";
import { getCurrentWeather, getFiveDayForecast } from "../utils/api";
import { Redirect } from "react-router-dom";

class Form extends Component {
  state = {
    location: "",
    redirect: false
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
      //   const [currentWeather, fiveDayForecast] = await this.getData();
      //   console.log("Current: ", currentWeather);
      //   console.log("Five day forecast: ", fiveDayForecast);
      this.setRedirect();
    } else {
      this.clearInput();
    }
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/forecast",
            search: `?location=${this.state.location}`
          }}
        />
      );
    }
  };

  clearInput = () => {
    this.setState({ location: "" });
    this.textInput.current.focus();
  };

  getData = async () => {
    return Promise.all([
      this.getDataForCurrentTime(),
      this.getDataForFiveDays()
    ]).then(data => data);
  };

  getDataForFiveDays = async () => {
    const { location } = this.state;
    const data = await getFiveDayForecast(location);
    return data;
  };

  getDataForCurrentTime = async () => {
    const { location } = this.state;
    const data = await getCurrentWeather(location);
    return data;
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
        />
        <button>Get Weather</button>
      </form>
    );
  }
}

export default Form;
