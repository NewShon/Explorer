import actionTypes from './actionTypes';
import baseUrl from '../../../Common/BaseUrl';
import header from '../../../Common/AxiosHeader';

export const usersRequested = (role) => {
	let path = `${baseUrl}/Account`;
	return {
		type: actionTypes.USERS_REQUESTED,
		request: {
			method: 'get',
			url: `${path}/GetUsers`,
            headers: header(),
            params: {
                role: role
            },
        },
	};
};

export const usersLoaded = (users) => {
	return {
		type: actionTypes.USERS_LOADED,
		users
	};
};

export const rolesRequested = () => {
    let path = `${baseUrl}/Account`;
	return {
		type: actionTypes.ROLES_REQUESTED,
		request: {
			method: 'get',
			url: `${path}/GetRoles`,
			headers: header(),
		},
	};
};

export const rolesLoaded = (roles) => {
	return {
		type: actionTypes.ROLES_LOADED,
		roles
	};
};

export const rolesEdit = (data, selectedRole) => {
	let path = `${baseUrl}/Account`;
	return {
		type: actionTypes.ROLES_EDIT,
		request: {
			method: 'post',
			url: `${path}/EditRole`,
			headers: header(),
			data: data,
        },
        selectedRole
	};
};


