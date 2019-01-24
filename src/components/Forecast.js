import React, { Component } from "react";
import queryString from "query-string";
import Missing from "./Missing";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import {
  getCurrentWeather,
  getFiveDayForecast,
  formatDate
} from "../utils/api";

class Forecast extends Component {
  state = {
    location: null,
    error: false,
    loading: true,
    currentWeather: null,
    fiveDayForecast: null
  };

  async componentDidMount() {
    const [currentWeather, fiveDayForecast] = await this.getData();
    console.log("current", currentWeather);
    console.log("fivedayforecast", fiveDayForecast);
    if (fiveDayForecast === null) {
      return this.setState({ error: true });
    } else {
      this.setState({ currentWeather, fiveDayForecast, loading: false });
    }
  }

  getData = async () => {
    return Promise.all([
      this.getDataForCurrentTime(),
      this.getDataForFiveDays()
    ]).then(data => data);
  };

  getDataForFiveDays = async () => {
    const { location } = queryString.parse(this.props.location.search);
    const data = await getFiveDayForecast(location);
    return data;
  };

  getDataForCurrentTime = async () => {
    const { location } = queryString.parse(this.props.location.search);
    const data = await getCurrentWeather(location);
    return data;
  };

  render() {
    // Do all the rendering here
    const { location } = queryString.parse(this.props.location.search);
    const { loading, error, fiveDayForecast, currentWeather } = this.state;

    // If there are no params, render 404 page
    if (!location) {
      return <Missing />;
    }

    // If error, render Error
    if (error) {
      return <h2>Error!</h2>;
    }

    // If loading, render Loading
    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <h2>{this.state.currentWeather.name}</h2>
        <Days data={fiveDayForecast} />
      </div>
    );
  }
}

class Days extends Component {
  render() {
    const { data } = this.props;
    const { list: days } = data;
    return (
      <ul>
        {days.map(day => (
          <Day key={day.dt} data={day} city={data.city.name} />
        ))}
      </ul>
    );
  }
}

class Day extends Component {
  onClick = () => {
    this.sendProps();
    console.log(this.props.city);
  };

  sendProps = () => {
    // console.log(this.props.data);
  };

  render() {
    const { data: day } = this.props;
    const dateStamp = formatDate(day.dt_txt);
    const { numberDay, month, dayDate } = dateStamp;

    // Or maybe Wrap in a Link element
    // Or redirect, who knows
    // New component, render and pass props

    return (
      <Link
        to={{
          pathname: ``,
          search: ``
        }}
      >
        <li className="day" onClick={this.onClick}>
          <img alt="Weather" />
          <p>
            {dayDate}, {month} {numberDay}
          </p>
        </li>
      </Link>
    );
  }
}

export default Forecast;
