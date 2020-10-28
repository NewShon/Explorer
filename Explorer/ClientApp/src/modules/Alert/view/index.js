import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Alert = ({ classes, error }) => {
	return <Paper className={classes.error}>{error}</Paper>;
};

Alert.propTypes = {
	classes: PropTypes.object.isRequired,
	error: PropTypes.string.isRequired,
};

export default withStyles(styles)(Alert);
