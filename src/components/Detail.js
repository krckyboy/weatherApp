import React from "react";
import queryString from "query-string";

/* If props are passed, render those */

/* If no props, fetch data from API */

function Detail(props) {
  const { city } = props.match.params;

  const day = props.location.data;
  console.log("Sent data:", day);
  return <div>DETAIL!</div>;
}

export default Detail;
