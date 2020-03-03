// Import

// Library
import React from "react";
import { NavLink } from "react-router-dom";

// Styles

export default function Landing() {
  return (
    <>
      <h1>Create an Account</h1>
      <NavLink
        to={{
          pathname: "/signup"
        }}
      >
        Signup
      </NavLink>
      <br />
      <h3>
        Already a user?
        <NavLink
          to={{
            pathname: "/login"
          }}
        >
          Login
        </NavLink>
      </h3>
    </>
  );
}
