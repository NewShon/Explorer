import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RegistrationContainer from '../modules/Authorization/Register/container/RegistrationContainer';
import LoginContainer from '../modules/Authorization/Login/container/LoginContainer';
import ContentContainer from '../modules/Content/container/ContentContainer';
import RoleContainer from '../modules/Role/container/RoleContainer';

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/directory/" component={ContentContainer} />
				<Route exact path="/directory/:folderPath+" component={ContentContainer} />
				<Route exact path="/register" component={RegistrationContainer} />
				<Route exact path="/login" component={LoginContainer} />
				<PrivateRoute exact path="/admin" component={RoleContainer} />
				<Redirect from="/" to="/directory/" />
				<Route children={() => <h2>404 - Not found</h2>} />
			</Switch>
		);
	}
}

export default Routes;
