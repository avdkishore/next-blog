import { combineReducers } from 'redux';

import editorReducer from './editor';
import pagebarReducer from './pagebar';

export default combineReducers({ editor: editorReducer, pagebar: pagebarReducer });