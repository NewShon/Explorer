import keymirror from 'keymirror';

const actions = keymirror({
	USER_AUTHORIZED: null,
	USER_UNAUTHORIZED: null,
	AUTH_ERROR_SET: null,
	AUTH_ERROR_CLEARED: null,
	AUTH_REQUESTED: null,
});

export default actions;
