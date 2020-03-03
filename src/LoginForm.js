import React from "react";
import axios from "axios";
import useForm from "./CustomHooks";

const LoginForm = props => {
  const login = () => {
    alert("Login Successful");

    axios
      .post("/login", {
        Email: inputs.email,
        password: inputs.password
      })
      .then(res => {
        // debugger
        localStorage.setItem("token", res.data.payload);
        props.history.push("/gamemenu");
      });
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(login);

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
