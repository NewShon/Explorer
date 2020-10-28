import actionTypes from '../actions/actionTypes';
import SessionService from '../../../Services/SessionService';

const initialState = {
	isAuthorized: !!SessionService.getItem('token'),
	role: SessionService.getItem('role'),
	authError: '',
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_REQUESTED:
			return {
				...state,
			};
		case actionTypes.USER_AUTHORIZED:
			return {
				...state,
				isAuthorized: true,
				role: action.role,
				authError: '',
			};
		case actionTypes.USER_UNAUTHORIZED:
			return {
				...state,
				isAuthorized: false,
				role: '',
			};
		case actionTypes.AUTH_ERROR_SET:
			return {
				...state,
				authError: action.error,
			};
		case actionTypes.AUTH_ERROR_CLEARED:
			return {
				...state,
				authError: '',
			};
		default:
			return state;
	}
};
export default UserReducer;
