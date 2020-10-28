import { takeLatest, call, put } from 'redux-saga/effects';
import actionTypes from '../modules/Content/actions/actionTypes';
import axios from 'axios';
import {
	contentLoaded,
	contentError,
	contentFileDownloaded,
	contentRequested
} from '../modules/Content/actions/ContentActions';

export function* watcherContent() {
	yield takeLatest(actionTypes.CONTENT_REQUESTED, workerSaga);
	yield takeLatest(actionTypes.CONTENT_FILE_DOWNLOAD_REQUESTED, downloadFileSaga);
	yield takeLatest(actionTypes.CONTENT_FOLDER_ADD, contentFolderAdd);
	yield takeLatest(actionTypes.CONTENT_FOLDER_DELETE, contentFolderDelete);
	yield takeLatest(actionTypes.CONTENT_FILE_UPLOAD, contentFileUpload);
	yield takeLatest(actionTypes.CONTENT_FOLDER_RENAME, contentFolderRename);	
}

function fetchContent(action) {
	return axios({  
		...action.request,
	});
}

function* workerSaga(action) {
	try {
		const response = yield call(fetchContent, action);
		yield put(contentLoaded(response.data));
	} catch (error) {
		yield put(contentError(error.toString()));
	}
}

function* downloadFileSaga(action) {
	try {
		const response = yield call(fetchContent, action);
		yield put(contentFileDownloaded(response.request.responseURL));
		window.open(response.request.responseURL);
	} catch (error) {
	}
}

function* contentFolderAdd(action) {
	try {
		yield call(fetchContent, action);
		yield put(contentRequested(action.path));
	} catch (error) {
	}
}

function* contentFolderDelete(action) {
	try {
		yield call(fetchContent, action);
		yield put(contentRequested(action.path));
	} catch (error) {
	}
}

function* contentFolderRename(action) {
	try {
		yield call(fetchContent, action);
		yield put(contentRequested(action.path));
	} catch (error) {
	}
}

function* contentFileUpload(action) {
	try {
		yield call(fetchContent, action);
		yield put(contentRequested(action.path));
	} catch (error) {
	}
}