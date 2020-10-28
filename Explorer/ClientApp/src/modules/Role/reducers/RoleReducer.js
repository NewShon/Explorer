import actionTypes from '../actions/actionTypes';

const initialState = {
	isLoaded: false,
	users: [],
	roles: [],
};

const RoleReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.USERS_REQUESTED:
			return {
				...state,
            };
        case actionTypes.USERS_LOADED:
			const { users} = action;
            return {
                ...state,
                users: users,
                isLoaded: true,
            };
        case actionTypes.ROLES_REQUESTED:
			return {
				...state,
            };
        case actionTypes.ROLES_LOADED:
            const { roles} = action;
            return {
                ...state,
                roles: roles,
                isLoaded: true,
            };
        case actionTypes.ROLES_EDIT:
			return {
				...state,
			};
		default:
			return state;
	}
};
export default RoleReducer;
