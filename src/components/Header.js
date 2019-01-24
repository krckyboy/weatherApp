import React from "react";
import Form from "./Form";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">Logo</Link>
      <Form />
    </header>
  );
}

export default Header;
