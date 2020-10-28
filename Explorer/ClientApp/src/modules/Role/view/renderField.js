import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import styles from "./styles";

const renderField = ({
  input,
  label,
  meta: { touched, error },
  classes,
  children
}) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.input} htmlFor={`input-${label}`}>
        {label}
      </InputLabel>
      <Select error={error && touched} {...input} id={`input-${label}`}>
        {children}
      </Select>
      <div>{touched && (error && <span>{error}</span>)}</div>
    </FormControl>
  );
};

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired
};

export default withStyles(styles)(renderField);