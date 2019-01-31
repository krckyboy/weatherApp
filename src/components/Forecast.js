import React, { Component } from "react";
import queryString from "query-string";
import Missing from "./Missing";
import Loading from "./Loading";
import { withRouter } from "react-router-dom";
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
    this.getAndUpdate();
  }

  getAndUpdate = (theProps = this.props.location.search) => {
    const { location } = queryString.parse(theProps);
    this.setState({ location }, async () => {
      const [currentWeather, fiveDayForecast] = await this.getData();
      this.updateStates(currentWeather, fiveDayForecast);
    });
  };

  updateStates = (currentWeather, fiveDayForecast) => {
    if (fiveDayForecast === null) {
      return this.setState({ error: true });
    } else {
      this.setState({
        currentWeather,
        fiveDayForecast,
        loading: false,
        error: false
      });
    }
  };

  componentWillReceiveProps(newProps) {
    this.getAndUpdate(newProps.location.search);
  }

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

  /* Render a new page and send object with data for the clicked day */
  showDetailPage = data => {
    this.props.history.push({
      pathname: "/details/" + this.state.location,
      data
    });
  };

  render() {
    // Do all the rendering here
    const {
      loading,
      error,
      fiveDayForecast,
      currentWeather,
      location
    } = this.state;
    const { match } = this.props;

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
        <Days
          data={fiveDayForecast}
          match={match}
          detail={this.showDetailPage}
        />
      </div>
    );
  }
}

class Days extends Component {
  render() {
    const { data, match, detail } = this.props;
    const { list: days } = data;
    return (
      <ul>
        {days.map(day => (
          <Day
            key={day.dt}
            data={day}
            city={data.city.name}
            match={match}
            click={detail}
          />
        ))}
      </ul>
    );
  }
}

class Day extends Component {
  render() {
    const { data: day, click } = this.props;
    const dateStamp = formatDate(day.dt_txt);
    const { numberDay, month, dayDate } = dateStamp;
    const { temp_min: min, temp_max: max } = day.main;

    return (
      <li className="day" onClick={() => click(day)}>
        <img alt="Weather" />
        <p>
          {dayDate}, {month} {numberDay}
        </p>
        <p>min: {min}</p>
        <p>max: {max}</p>
      </li>
    );
  }
}

export default withRouter(Forecast);
