import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userTokenKey } from './config';

export default ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => localStorage.getItem(userTokenKey) ? <Component {...props} /> : <Redirect to="/login" />}
	/>
);
