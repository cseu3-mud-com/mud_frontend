import React from "react";
import LoginForm from './LoginForm';
import Signup from "./SignupForm";
import Message from '../game/Message'
export default function Landing(props) {
  return (
    <>
      <h1>Login</h1>
      <LoginForm history={props.history} />
      <h1>Create an Account</h1>
      <Signup history={props.history} />
      <Message />
    </>
  );
}
