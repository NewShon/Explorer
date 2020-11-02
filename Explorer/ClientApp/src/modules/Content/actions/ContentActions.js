import actionTypes from './actionTypes';
import baseUrl from '../../../Common/BaseUrl';
import header from '../../../Common/AxiosHeader';

export const contentRequested = (folderPath, history) => {
	let path = `${baseUrl}/Folder/`;
	return {
		type: actionTypes.CONTENT_REQUESTED,
		request: {
			method: 'get',
			url: folderPath ? `${path}${folderPath}` : path,
			headers: header(),
		},
		folderPath,
		history,
	};
};

export const contentLoaded = (content) => {
	return {
		type: actionTypes.CONTENT_LOADED,
		content
	};
};
export const contentError = error => {
	return {
		type: actionTypes.CONTENT_ERROR,
		error,
	};
};
export const contentCleared = () => {
	return {
		type: actionTypes.CONTENT_CLEARED,
	};
};

export const contentFolderAdd = (path, folderPath) => {
	return {
		type: actionTypes.CONTENT_FOLDER_ADD,
		request: {
			method: 'post',
			url: `${baseUrl}/Folder/CreateFolder`,
			data: {
				FolderPath: folderPath,
			},
			headers: header(),
		},
		path
	};
};

export const contentFolderDelete = (path, folderPath) => {
	return {
		type: actionTypes.CONTENT_FOLDER_DELETE,
		request: {
			method: 'delete',
			url: `${baseUrl}/Folder/`,
			data: {
				FolderPath: folderPath,
			},
			headers: header(),
		},
		folderPath,
		path
	};
};

export const contentFolderRename = (path, lastPath, newPath) => {
	return {
		type: actionTypes.CONTENT_FOLDER_RENAME,
		request: {
			method: 'post',
			url: `${baseUrl}/Folder/RenameFolder`,
			data: {
				LastPath: lastPath,
				NewPath: newPath
			},
			headers: header(),
		},
		path
	};
};

export const contentFileDownloadRequested = (filePath, fileName, history, path) => {
	return {
		type: actionTypes.CONTENT_FILE_DOWNLOAD_REQUESTED,
		request: {
			method: 'get',
			url: `${baseUrl}/File/${filePath}/${fileName}`,
			headers: header(),
		},
		filePath,
		history,
		path
	};
};

export const contentFileDownloaded = (file) => {
	return {
		type: actionTypes.CONTENT_FILE_DOWNLOADED,
		file
	};
};

export const contentFileUpload = (path, fileData) => {
	return {
		type: actionTypes.CONTENT_FILE_UPLOAD,
		request: {
			method: 'post',
			url: `${baseUrl}/File/${path}`,
			headers: header(),
			data: fileData
		},
		path
	};
};