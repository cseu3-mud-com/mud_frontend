import React from "react";
import axios from "axios";
import useSignUpForm from "./CustomHooks";

const Signup = props => {
  console.log(props, "lllllll");
  const signup = () => {
    alert(`User Created!
					 Username: ${inputs.username}
					 Email: ${inputs.email}`);

    axios
      .post("https://mud-api-20.herokuapp.com/api/registration/", {
        username: inputs.username,
        email: inputs.email,
        password1: inputs.password1,
        password2: inputs.password2
      })
      .then(res => {
        // debugger
        localStorage.setItem("token", res.data.key);
        props.history.push("/gamemenu");
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          value={inputs.username}
          required
        />
      </div>
      <br />
      <div>
        <label>Email</label>
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
