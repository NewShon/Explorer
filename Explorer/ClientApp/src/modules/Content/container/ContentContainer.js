import React from 'react';
import Content from '../view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/ContentActions';


class ContentContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		
		const { history, isAuthorized } = this.props;
		if(!isAuthorized){
			history.push('/login');
		}

		this.state = {
			folderPath: this.props.match.params.folderPath,
			openFolderCreate: false,
			openFolderDelete: false,
			openFolderRename: false,
			deletedItem: null, 
			renamedItem: null,
			textFieldValue: "",
		};
	}

	updatePath(path) {
		if (path !== undefined) {
			return path.replaceAll("\\","%5C");
		}
		return null;
	}

	componentDidMount() {
		this.getContent();
	}

	getContent(){
		const { contentRequested, history } = this.props;
		if(this.state.folderPath)
		{
			let pathForGetContent = this.state.folderPath.replaceAll("/","%5C");
			if(this.state.folderPath.length === 2){
				pathForGetContent = this.state.folderPath + "%5C";
			}
			contentRequested(pathForGetContent);
		}
		else {
			contentRequested(null);
		}
	}

	onFolderClick = (e, item) => {
		const { contentRequested, history} = this.props;
		let path = this.updatePath(item.path);
		let historyPath = "/directory/" + item.path;
		history.push(historyPath);
		contentRequested(path);
	}

	onBackClick = () => {
		const { path, contentRequested, history } = this.props;
		if (path){
			if(path.slice(-1) === "\\"){
				history.push("/");
				contentRequested(null);
			}
			else{
				let rootPath = path.substring(0, path.lastIndexOf("\\") + 0);
				let backPath = rootPath.includes("\\") ? rootPath : rootPath + "\\";
				let updatedBackPath = this.updatePath(backPath);
				let historyPath = "/directory/" + rootPath;
				history.push(historyPath);
				contentRequested(updatedBackPath, history);
			}
		}
		else{
			contentRequested(null);
		}
	}

	onFileDownloadClick = (e, item) => {
		const { contentFileDownloadRequested, path, history } = this.props;
		let itemPath =  this.updatePath(item.path);
		contentFileDownloadRequested(itemPath, item.name, history, this.updatePath(path));
	}

	onFileChange = event => { 
		this.setState({ selectedFile: event.target.files[0] }); 
	  }; 
	   
	onFileUpload = () => { 
		const { contentFileUpload, path } = this.props;

		const formData = new FormData(); 
		formData.append( 
		  "uploadedFile", this.state.selectedFile, 
		); 

		contentFileUpload(this.updatePath(path), formData);
	}; 

	onFolderRenameClick = (e, item) => {
		this.setState({ openFolderRename: true, renamedItem: item, textFieldValue: "" });
	}

	onHandleRename = () => {
		const { path, contentFolderRename } = this.props;

		let rootPath = this.updatePath(path);
		let lastPath = this.state.renamedItem.path;
		let newPath = path + "\\" + this.state.textFieldValue;

		contentFolderRename(rootPath, lastPath, newPath);
		
		this.setState({ openFolderRename: false });
	}

	onFolderDeleteClick = (e, item) => {
		this.setState({ openFolderDelete: true, deletedItem: item });
	}

	onHandleDelete = () => {
		const { path, contentFolderDelete } = this.props;
		let rootPath = this.updatePath(path);
		contentFolderDelete(rootPath, this.state.deletedItem.path);
		
		this.setState({ openFolderDelete: false });
	}

	onFolderCreateClick = () => {
		this.setState({ openFolderCreate: true, textFieldValue: "" });
	}

	onHandleOk = () => {
		const { path, contentFolderAdd } = this.props;
		let rootPath = this.updatePath(path);
		let folderPath = path + "\\" + this.state.textFieldValue;
		contentFolderAdd(rootPath, folderPath);

		this.setState({ openFolderCreate: false });
	}

	handleTextFieldChange = (e) => {
        this.setState({
            textFieldValue: e.target.value
        });
    }

	onHandleCancel =() => {
		this.setState({ openFolderCreate: false, openFolderDelete: false, openFolderRename: false, deletedItem: null });
	}

	render() {
		const { folders, files, path, role, isLoaded} = this.props;
		return (
			<Content 
				openFolderCreate={this.state.openFolderCreate}
				openFolderDelete={this.state.openFolderDelete}
				openFolderRename={this.state.openFolderRename}

				onFolderCreateClick={this.onFolderCreateClick}
				onHandleOk={this.onHandleOk}
				onHandleCancel={this.onHandleCancel}
				textFieldValue={this.state.textFieldValue}
				handleTextFieldChange={this.handleTextFieldChange}

				onFileChange={this.onFileChange}
				onFileUpload={this.onFileUpload}

				onFolderDeleteClick={this.onFolderDeleteClick}
				onHandleDelete={this.onHandleDelete}

				folders={folders}
				files={files}
				path={path}
				role={role}
				isLoaded={isLoaded}
				
				onFolderClick={this.onFolderClick}
				onFileDownloadClick={this.onFileDownloadClick}

				onFolderRenameClick={this.onFolderRenameClick}
				onHandleRename={this.onHandleRename}

				onBackClick={this.onBackClick}
			/>
		);
	}
}

ContentContainer.propTypes = {
	contentRequested: PropTypes.func.isRequired,
	contentFileDownloadRequested: PropTypes.func.isRequired,
	contentFolderAdd: PropTypes.func.isRequired,
	contentFolderDelete: PropTypes.func.isRequired,
	folders: PropTypes.array.isRequired,
	files: PropTypes.array.isRequired,
	role: PropTypes.string.isRequired,
	isLoaded: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
	return { ...state.content, ...state.user };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...actions }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContentContainer);