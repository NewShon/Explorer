import React from 'react';
import Role from '../view';
import { connect } from 'react-redux';
import * as actions from '../actions/RoleActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


class RoleContainer extends React.PureComponent {
	constructor(props) {
        super(props);
        
        this.state = {
            selectedRole: null,
            user: '',
            open: false,
            role: null,
            newRole: ""
        };
        
    }

    componentDidMount() {
		const { rolesRequested } = this.props;
        rolesRequested();
    } 
    
    handleClickOpen = (user) => {
        this.setState({open: true, user: user});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleSave = () => {
        const { rolesEdit } = this.props;

        var request = {
            userName: this.state.user,
            role: this.state.newRole,
        };

        const data = { request };

        rolesEdit(data, this.state.selectedRole);
        
        this.setState({open: false});
    }

    onChange = (item) => {
        this.setState({newRole: item.role});
    }

    onTabSelect = (e, role) => {
        this.setState({selectedRole: role});
        const { usersRequested } = this.props;

        usersRequested(role);
    }
    
	render() {
        const { users, roles} = this.props;
		return (
            <Role
            selectedRole={this.state.selectedRole}
            onTabSelect={this.onTabSelect}
            users={users}
            roles={roles}
            handleClickOpen={this.handleClickOpen}
            open={this.state.open}
            user={this.state.user}
            handleClose={this.handleClose}
            handleSave={this.handleSave}
            onChange={this.onChange}
            />
		);
	}
}

RoleContainer.propTypes = {
    users: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,
    usersRequested: PropTypes.func.isRequired,
    rolesEdit: PropTypes.func.isRequired,
    rolesRequested: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return { ...state.role };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...actions }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoleContainer);