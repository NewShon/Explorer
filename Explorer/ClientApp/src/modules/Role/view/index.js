import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import renderField from "./renderField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm } from "redux-form";
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

let Role = ({ 
    user,
    users,
    roles,
    open,
    classes,
    onTabSelect,
    onChange,
    selectedRole,
    handleClickOpen,
    handleClose,
    handleSave,
}) => {
    const role = selectedRole ? selectedRole : roles.length === 0 ? false: roles[0].name;

	return (
		<React.Fragment>  

          <Paper square>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={role}
                >
                    {roles.map((item, i) => {
                        return (
                            <Tab
                                onClick={((e) => onTabSelect(e, item.name))} 
                                key={i}
                                label={item.name}
                                value={item.name}
                            />
                        );
                    })}
                </Tabs>
            </Paper>

            {users.map((item, i) => (
                <div key={i}>
                    <div style={{display: "inline-flex"}}>
                        <div style={{minWidth: "250px"}}>Name: {item.userName}</div>
                        <div>
                            <Button variant="outlined" color="primary" onClick={() => handleClickOpen(item.userName)}>
                                Change role
                            </Button> 
                        </div>
                    </div>
                    <Divider/>
                </div>
            ))} 
        
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Change role for {user}
                    </DialogContentText>
                    <Field
                        name="role"
                        component={renderField}
                        label="Role"
                        onChange={(e) => onChange(e)}
                    >
                        {roles.map((item, i) => (
                        <MenuItem key={i} value={item.name} className={classes.menuItem}>
                            {item.name}
                        </MenuItem>
                        ))}
                    </Field>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

		</React.Fragment>
	);
};

Role.propTypes = {
    users: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    onTabSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    handleClickOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
}

Role = reduxForm({
    form: "Managment"
})(Role);

export default withStyles(styles)(Role);

