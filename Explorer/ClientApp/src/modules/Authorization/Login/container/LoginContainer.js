import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/UserActions';
import Login from '../view';

class LoginContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.props.authErrorCleared();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		const { history, authRequested } = this.props;
		var request = {
			userName: values.userName,
			password: values.password,
		}
		const data = {
			request
		  };
		  
		authRequested('login', data, history);
	}

	render() {
		return (
			<Login onSubmit={this.handleSubmit} authError={this.props.authError} />
		);
	}
}

LoginContainer.propTypes = {
	authError: PropTypes.string.isRequired,
	authErrorCleared: PropTypes.func.isRequired,
	authRequested: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return { ...state.user };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...actions }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);
