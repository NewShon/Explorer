import keymirror from 'keymirror';

const actions = keymirror({
	CONTENT_REQUESTED: null,
	CONTENT_LOADED: null,
	CONTENT_ERROR: null,
	CONTENT_CLEARED: null,

	CONTENT_FOLDER_ADD: null,
	CONTENT_FOLDER_DELETE: null,

	CONTENT_FILE_DOWNLOAD_REQUESTED: null,
	CONTENT_FILE_DOWNLOADED: null,

	CONTENT_FILE_UPLOAD: null,

	CONTENT_FOLDER_RENAME: null,
});

export default actions;
