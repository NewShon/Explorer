import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { rootSaga } from './Sagas/rootSaga';
import Header from './modules/Header/view';
import Routes from './Routes/Routes';
import UserReducer from './modules/Authorization/reducers/UserReducer';
import ContentReducer from './modules/Content/reducers/ContentReducer';
import RoleReducer from './modules/Role/reducers/RoleReducer';


const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
	form: formReducer,
	user: UserReducer,
	content: ContentReducer,
	role: RoleReducer,
});
const reduxDevTools =
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
	reducers,
	reduxDevTools,
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<React.Fragment>
						<Header />
						<Routes />
					</React.Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
