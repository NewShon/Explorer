import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
	validatePassword,
	validateSimpleField,
	validateMatchPassword,
} from '../../../../Common/FormValidation';
import PropTypes from 'prop-types';
import renderField from './renderFiled';
import Alert from '../../../Alert/view';
import styles from './styles';

let RegistrationForm = ({ handleSubmit, authError, classes }) => {
	return (
		<Paper className={classes.container}>
			<img
				src= "https://razorpay.com/learn-content/uploads/2020/02/serveimage-770x515.jpeg"
				alt="joke"
				className={classes.image}
			/>
			{authError ? <Alert error={authError} /> : null}
			<form onSubmit={handleSubmit}>
				<Field
					name="userName"
					component={renderField}
					type="text"
					label="User Name"
					validate={validateSimpleField}
				/>
				<Field
					name="email"
					component={renderField}
					type="text"
					label="Email"
					validate={validateSimpleField}
				/>
				<Field
					name="password"
					component={renderField}
					type="password"
					label="Password"
					validate={validatePassword}
				/>
				<Field
					name="confirmPassword"
					component={renderField}
					type="password"
					label="Confirm password"
					validate={[validatePassword, validateMatchPassword]}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={classes.button}
				>
					Send
				</Button>
			</form>
		</Paper>
	);
};

RegistrationForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	authError: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	form: PropTypes.string.isRequired,
};

RegistrationForm = reduxForm({
	form: 'registration',
})(RegistrationForm);

export default withStyles(styles)(RegistrationForm);
