import actionTypes from '../actions/actionTypes';

const initialState = {
	isLoaded: false,
	error: '',
	path: '',
	folders: [],
	files: [],
	file: '',
};

const ContentReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CONTENT_REQUESTED:
			return {
				...state,
				...initialState,
			};
		case actionTypes.CONTENT_LOADED:
			const { content} = action;
			return {
				...state,
				path: content.path,
				folders: content.folders,
				files: content.files,
				isLoaded: true,
			};
		case actionTypes.CONTENT_ERROR:
			return {
				...state,
				error: action.error,
				isLoaded: false,
			};
		case actionTypes.CONTENT_CLEARED:
			return {
				...state,
			};
		case actionTypes.CONTENT_FILE_DOWNLOAD_REQUESTED:
		return {
			...state,
		};
		case actionTypes.CONTENT_FILE_DOWNLOADED:
		const { file } = action;
		return {
			...state,
			file: file,
		};
		default:
			return state;
	}
};
export default ContentReducer;
