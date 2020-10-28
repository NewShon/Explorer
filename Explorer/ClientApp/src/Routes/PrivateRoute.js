import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

const PrivateRoute = ({ role, ...props }) => {
	return role === 'SuperAdmin' || role === 'Admin' ? <Route {...props} /> : <Redirect to="/login" />;
};

const mapStateToProps = state => {
	return { ...state.user };
};

export default connect(mapStateToProps)(PrivateRoute);
