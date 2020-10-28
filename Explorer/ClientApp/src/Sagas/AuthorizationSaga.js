import { takeLatest, call, put } from 'redux-saga/effects';
import {
	userAuthorized,
	authErrorSet,
} from '../modules/Authorization/actions/UserActions';
import actionTypes from '../modules/Authorization/actions/actionTypes';
import SessionService from '../Services/SessionService';
import axios from 'axios';

export function* watcherAuth() {
	yield takeLatest(actionTypes.AUTH_REQUESTED, authSaga);
}

function axiosAuth(action) {
	return axios({
		...action.request,
	});
}

function* authSaga(action) {
	try {
		const response = yield call(axiosAuth, action);
		SessionService.setItems(response.data);

		yield put(userAuthorized(response.data.role));
		yield action.history.push(window.history.back());
	} catch (error) {
		error.response
			? yield put(authErrorSet(error.response.data.toString()))
			: yield put(authErrorSet(error.toString()));
	}
}
