import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
	Paper,
	Typography,
	MenuItem,
	Menu,
} from '@material-ui/core';
import SessionService from '../../../Services/SessionService';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from './styles';

const MenuApp = ({
	classes,
	isAuthorized,
	handleMenu,
	anchorEl,
	handleClose,
	handleLogOut,
	role,
}) => {
	return (
		<Paper className={classes.root}>
			<div className={classes.searchContainer}>
				<Typography className={classes.title} component={Link} to="/">
					Explorer
				</Typography>
			</div>
			<div className={classes.userContainer}>
				{isAuthorized ? (
					<Typography className={classes.userName}>
						{`Hello, ${SessionService.getItem('userName')}`}
					</Typography>
				) : null}
				<IconButton
					aria-owns={!!anchorEl ? 'menu-appbar' : null}
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
					className={classes.menuButton}
				>
					<AccountCircle />
				</IconButton>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={!!anchorEl}
					onClose={handleClose}
				>
					{role === 'SuperAdmin' ? (
						<MenuItem onClick={handleClose} component={Link} to="/admin">
							User Management
						</MenuItem>
					) : null}
					{isAuthorized ? (
						<MenuItem onClick={handleLogOut} component={Link} to="/login">Sign out</MenuItem>
					) : (
						[
							<MenuItem
								onClick={handleClose}
								key={1}
								component={Link}
								to="/register"
							>
								Sign up
							</MenuItem>,
							<MenuItem
								onClick={handleClose}
								key={2}
								component={Link}
								to="/login"
							>
								Sign in
							</MenuItem>,
						]
					)}
				</Menu>
			</div>
		</Paper>
	);
};

MenuApp.propTypes = {
	classes: PropTypes.object.isRequired,
	isAuthorized: PropTypes.bool.isRequired,
	handleMenu: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	anchorEl: PropTypes.object,
	role: PropTypes.string,
};

export default withStyles(styles)(MenuApp);
