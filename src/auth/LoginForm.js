import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userTokenKey } from "../config";
import useForm from "../hooks/useForm";
import axios from "../hooks/useAxios";
import Styl from "../styledComponents";

const LoginForm = props => {
  const [errMsg, setErrMsg] = useState("");
  const { inputs, handleInputChange, handleSubmit } = useForm(() => {
    axios(false)
      .post("api/login/", {
        username: inputs.username,
        password: inputs.password
      })
      .then(res => {
        localStorage.setItem(userTokenKey, res.data.key);
        props.history.push("/menu");
      })
      .catch(err => {
        console.log(err);
        setErrMsg("Invalid Credentials");
      });
  });

  return (
    <>
      <Styl.BackgroundImage src="backgrounds/1.jpg" />
      <Styl.OverlayContent>
        <Styl.Title>Login</Styl.Title>
        <h1 style={{ color: "white" }}>{errMsg}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              autoComplete="current-username"
              autoFocus={true}
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
              autoComplete="current-password"
              onChange={handleInputChange}
              value={inputs.password}
              required
            />
          </div>
          <div className="flex two">
            <div className="column">
              <Styl.Button type="submit">Login</Styl.Button>
            </div>
            <div className="column">
              <Link to="/register">
                <Styl.Button type="button" className="alignRight">
                  Sign up
                </Styl.Button>
              </Link>
            </div>
          </div>
        </form>
      </Styl.OverlayContent>
    </>
  );
};

export default LoginForm;
