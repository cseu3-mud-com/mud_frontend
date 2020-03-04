import React from "react";
import { Redirect } from 'react-router-dom';
import { userTokenKey } from '../config';

const Logout = props => {
  localStorage.removeItem(userTokenKey);
  return <Redirect to="/login" />;
};

export default Logout;
