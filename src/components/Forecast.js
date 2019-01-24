import React from "react";
import queryString from "query-string";

function Forecast(props) {
  const { location } = queryString.parse(props.location.search);
  console.log(props.location.pathname);
  return <p>Forecast! Query: {location}</p>;
}

export default Forecast;
