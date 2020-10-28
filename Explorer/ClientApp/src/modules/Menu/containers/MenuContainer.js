import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../Authorization/actions/UserActions';
import SessionService from '../../../Services/SessionService';
import Menu from '../view';

class MenuContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null
		};
	}
	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	}

	handleClose = () => {
		this.setState({ anchorEl: null });
	}
	handleLogOut = () => {
		const { user } = this.props;

		this.handleClose();
		SessionService.removeAllItems();
		user.userUnauthorized();
	}
	onChangeField = (event) => {
		this.setState({ search: event.target.value });
	}

	render() {
		const { isAuthorized, role } = this.props;
		const { anchorEl } = this.state;

		return (
			<Menu
				isAuthorized={isAuthorized}
				handleMenu={this.handleMenu}
				anchorEl={anchorEl}
				handleClose={this.handleClose}
				handleLogOut={this.handleLogOut}
				role={role}
			/>
		);
	}
}

MenuContainer.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		...state.user,
	};
};

const mapDispatchToProps = dispatch => ({
	user: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuContainer);
