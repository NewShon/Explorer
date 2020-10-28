import keymirror from 'keymirror';

const actions = keymirror({
	USERS_REQUESTED: null,
    USERS_LOADED: null,
    
    ROLES_REQUESTED: null,
	ROLES_LOADED: null,
	
	ROLES_EDIT: null,
});

export default actions;
