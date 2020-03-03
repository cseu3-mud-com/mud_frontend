import React from "react";
import axios from "axios";
import useSignUpForm from "./CustomHooks";

const Signup = props => {
  console.log(props, "lllllll");
  const signup = () => {
    alert(`User Created!
					 Name: ${inputs.firstName} ${inputs.lastName}
					 Email: ${inputs.email}`);

    axios
      .post("/signup", {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        Email: inputs.email,
        password1: inputs.password1,
        password2: inputs.password2
      })
      .then(res => {
        // debugger
        localStorage.setItem("token", res.data.payload);
        props.history.push("/gamemenu");
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          value={inputs.firstName}
          required
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          value={inputs.lastName}
          required
        />
      </div>
      <br />
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
          required
        />
      </div>
      <br />
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password1"
          onChange={handleInputChange}
          value={inputs.password1}
        />
      </div>
      <br />
      <div>
        <label>Re-enter Password</label>
        <input
          type="password"
          name="password2"
          onChange={handleInputChange}
          value={inputs.password2}
        />
      </div>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
