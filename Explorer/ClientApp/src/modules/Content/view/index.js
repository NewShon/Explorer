import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Content = ({ 
	openFolderCreate,
	openFolderRename,
	openFolderDelete,
	onHandleDelete,
	onHandleRename,
	textFieldValue,
	folders,
	files,
	path,
	classes,
	role,
	onFolderClick,
	onFolderCreateClick,
	onFileDownloadClick,
	onFileUploadClick,
	onHandleOk,
	onHandleCancel,
	handleTextFieldChange,
	onFolderDeleteClick,
	onFileChange,
	onFileUpload,
	onFolderRenameClick,
	onBackClick,
}) => {
	return (
		<React.Fragment>
			
			<div style={{marginLeft: "20px", marginBottom: "20px"}}>

				<div >
					<h2>Current folder: {path}</h2>
					<Button
					onClick={(() => onBackClick())}
					variant="contained" 
					size="medium"
					>
						<ArrowBackIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
						Back
					</Button>
				</div>
			
				<h3>Folders</h3>

				<div style={{marginBottom: "40px"}}>
					{folders.map((item, i) => {
					return <div key={i} style={{display: "inline-flex"}}> 
						
						<div style={{display: "inline-flex"}}>

							<div>
								<Button 
									onClick={((e) => onFolderClick(e, item))} 
									variant="contained" 
									size="medium"
									className={classNames(classes.button, classes.buttonFolder)} 
									>
										<FolderIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
										<p key={i}>{item.name}</p>
								</Button>
							</div>

							<div style={{display: "inline-block"}}>
								<div style={{marginTop: "4px", marginBottom: "4px"}}>
									<Button 
										onClick={((e) => onFolderRenameClick(e, item))} 
										variant="contained" 
										size="small"
										color="primary" 
										>
											<CreateIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
									</Button>
								</div>

								<div>
									<Button 
										onClick={((e) => onFolderDeleteClick(e, item))} 
										variant="contained" 
										size="small"
										color="secondary" 
										>
											<DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
									</Button>
								</div>
							</div>
						</div>
					</div>;
					})}
				</div>

				<h3>Files</h3>
				
				<div>
					{files.map((item, i) => {
					return <div key={i}> 
						<Button 
						onClick={((e) => onFileDownloadClick(e, item))} 
						variant="contained" 
						size="small"
						className={classNames(classes.button, classes.buttonFile)} 
						>
							<p key={i}>{item.name}</p>
							<SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
						</Button>
					</div>;
					})}
				</div>

			</div>

			<div  style={role === "Admin" || role === "SuperAdmin" ? { display:'block', position: "fixed", bottom: "10px", right: "20px"} : {display : 'none'}}>
				<div style={{display: "inline"}}>

					<Dialog open={openFolderCreate} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">Create new folder</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Enter the folder name.
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Folder name"
								type="email"
								fullWidth
								value={textFieldValue} 
								onChange={handleTextFieldChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={onHandleCancel} color="primary">
								Cancel
							</Button>
							<Button onClick={onHandleOk} color="primary">
								Ok
							</Button>
						</DialogActions>
					</Dialog>

					<Dialog open={openFolderRename} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Rename folder</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Enter the folder name.
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Folder name"
								type="email"
								fullWidth
								value={textFieldValue} 
								onChange={handleTextFieldChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={onHandleCancel} color="primary">
								Cancel
							</Button>
							<Button onClick={onHandleRename} color="primary">
								Ok
							</Button>
						</DialogActions>
					</Dialog>

					<Dialog open={openFolderDelete}>
						<DialogTitle id="alert-dialog-title">
							{"Are you sure you want to delete folder?"}
						</DialogTitle>
						<DialogActions>
							<Button onClick={onHandleCancel} color="primary">
								Cancel
							</Button>
							<Button onClick={onHandleDelete} autoFocus>
								Delete
							</Button>
						</DialogActions>
					</Dialog>

					<Button 
					onClick={((e) => onFolderCreateClick(e))} 
					variant="contained" 
					size="small"
					color="primary" 
					className={classes.button} 
					>
						<CreateNewFolderIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
						<p>Create folder</p>
					</Button>

					<div> 
						<input type="file" onChange={onFileChange} /> 
						<button onClick={onFileUpload}> 
							Upload! 
						</button> 
					</div>

				</div>
			</div>
			
		</React.Fragment>
	);
};


Content.propTypes = {
	onFolderClick: PropTypes.func.isRequired,
	onFolderCreateClick: PropTypes.func.isRequired,
	onFileDownloadClick: PropTypes.func.isRequired,
	onFileUpload: PropTypes.func.isRequired,
	folders: PropTypes.array.isRequired,
	files: PropTypes.array.isRequired,
	path: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Content);