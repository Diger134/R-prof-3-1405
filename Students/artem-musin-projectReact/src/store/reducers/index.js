import { combineReducers } from 'redux';
import msgReducer from './messages_reducers.js';
import prflReducer from './profile_reducers.js';

export default combineReducers({msgReducer, prflReducer})