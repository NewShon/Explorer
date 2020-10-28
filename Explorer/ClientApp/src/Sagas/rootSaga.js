import { all } from 'redux-saga/effects';
import { watcherAuth } from './AuthorizationSaga';
import { watcherContent } from './ContentSaga';
import { watcherRole } from './RoleSaga';

export function* rootSaga() {
	yield all([
		watcherAuth(),
		watcherContent(),
		watcherRole()
	]);
}
