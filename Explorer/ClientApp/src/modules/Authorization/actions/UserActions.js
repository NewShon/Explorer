import actionTypes from './actionTypes';
import baseUrl from '../../../Common/BaseUrl';

export const userAuthorized = role => {
	return {
		type: actionTypes.USER_AUTHORIZED,
		role,
	};
};
export const userUnauthorized = () => {
	return {
		type: actionTypes.USER_UNAUTHORIZED,
	};
};
export const authErrorSet = error => {
	return {
		type: actionTypes.AUTH_ERROR_SET,
		error,
	};
};
export const authErrorCleared = () => {
	return {
		type: actionTypes.AUTH_ERROR_CLEARED,
	};
};
export const authRequested = (url, data, history) => {
	return {
		type: actionTypes.AUTH_REQUESTED,
		request: {
			method: 'post',
			url: `${baseUrl}/account/${url}`,
			data: data,
		},
		history,
	};
};