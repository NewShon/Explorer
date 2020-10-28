import { takeLatest, call, put } from 'redux-saga/effects';
import actionTypes from '../modules/Role/actions/actionTypes';
import axios from 'axios';
import {
    rolesLoaded,
    usersLoaded,
    usersRequested,
} from '../modules/Role/actions/RoleActions';

export function* watcherRole() {
    yield takeLatest(actionTypes.USERS_REQUESTED, usersRequestedWorker);
	yield takeLatest(actionTypes.ROLES_REQUESTED, rolesRequested);
	yield takeLatest(actionTypes.ROLES_EDIT, rolesEdit);    
}


function fetch(action) {
	return axios({  
		...action.request,
	});
}

function* usersRequestedWorker(action) {
	try {
        const response = yield call(fetch, action);
		yield put(usersLoaded(response.data));
	} catch (error) {
	}
}

function* rolesRequested(action) {
	try {
        const response = yield call(fetch, action);
        yield put(rolesLoaded(response.data));
        yield put(usersRequested(response.data[0].name));
	} catch (error) {
	}
}

function* rolesEdit(action) {
	try {
        yield call(fetch, action);
        yield put(usersRequested(action.selectedRole));
	} catch (error) {
	}
}
