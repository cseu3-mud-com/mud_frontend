import React from "react";
import useForm from "../hooks/useForm";
import axios from "../hooks/useAxios";
import { userTokenKey } from '../config';

const LoginForm = props => {
  const login = () => {
    axios(false)
      .post("api/login/", {
        username: inputs.username,
        password: inputs.password
      })
      .then(res => {
        localStorage.setItem(userTokenKey, res.data.key);
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
