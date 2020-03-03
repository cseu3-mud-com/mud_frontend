import React from "react";
import useForm from "./CustomHooks";
import axiosWithAuth from "./auth";

const LoginForm = props => {
  const login = () => {
    alert("Login Successful");

    // axios
    axiosWithAuth()
      .post("https://mud-api-20.herokuapp.com/api/login/", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
      })
      .then(res => {
        // debugger
        // console.log(res, "lllllll");
        localStorage.setItem("token", res.data.key);
        props.history.push("/gamemenu");
      });
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(login);

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
