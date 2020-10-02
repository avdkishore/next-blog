import { combineReducers } from 'redux';

import clockReducer from './clock';

export default combineReducers({ clock: clockReducer });