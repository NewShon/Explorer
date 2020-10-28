import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/UserActions';
import Registration from '../view';

class RegistrationContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.props.authErrorCleared();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		const { history, authRequested } = this.props;

		var request = {
			userName: values.userName,
			email: values.email,
			password: values.password,
			passwordConfirm: values.password
		};
		const data = {
			request
		};
		authRequested('register', data, history);
	}

	render() {
		return (
			<Registration
				onSubmit={this.handleSubmit}
				authError={this.props.authError}
			/>
		);
	}
}

RegistrationContainer.propTypes = {
	authError: PropTypes.string.isRequired,
	authErrorCleared: PropTypes.func.isRequired,
	authRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return {
		...state.user,
	};
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...actions }, dispatch);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegistrationContainer);
