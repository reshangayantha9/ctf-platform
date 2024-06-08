import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './Reducers/authReducer';
import challengeReducer from './Reducers/challengeReducer';
import teamReducer from './Reducers/teamReducer';
import submissionReducer from './Reducers/submissionReducer';
import userReducer from './Reducers/userReducer';
import settingReducer from './Reducers/settingReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  user:userReducer,
  challenge: challengeReducer,
  team: teamReducer,
  submission: submissionReducer,
  settings: settingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token && user) {
    store.dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
}

export default store;
