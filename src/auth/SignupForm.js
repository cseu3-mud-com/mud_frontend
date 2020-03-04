import React from "react";
import { Link } from 'react-router-dom';
import axios from "../hooks/useAxios";
import useSignUpForm from "../hooks/useForm";
import { userTokenKey } from '../config';
import Styl from "../styledComponents";

const Signup = props => {
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(() => {
    axios(false)
      .post("api/registration/", {
        username: inputs.username,
        email: inputs.email,
        password1: inputs.password1,
        password2: inputs.password2
      })
      .then(res => {
        localStorage.setItem(userTokenKey, res.data.key);
        props.history.push("/menu");
      }).catch(error => {
        console.error(error);
      });
  });

  return (<>
    <Styl.BackgroundImage src="backgrounds/1.jpg" />
    <Styl.OverlayContent>
      <Styl.Title>Sign up</Styl.Title><form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            autoFocus={true}
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
            name="password1"
            onChange={handleInputChange}
            value={inputs.password1}
            required
          />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="password"
            name="password2"
            onChange={handleInputChange}
            value={inputs.password2}
            required
          />
        </div>
        <div className="flex two">
          <div className="column">
            <Styl.Button type="submit">Sign up</Styl.Button>
          </div>
          <div className="column">
            <Link to="/login"><Styl.Button type="button" className="alignRight">Login</Styl.Button></Link>
          </div>
        </div>
      </form>
    </Styl.OverlayContent>
  </>);
};

export default Signup;
