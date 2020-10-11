import { all, call, delay, put, take, takeLatest, fork } from 'redux-saga/effects'
import editor from '../actions/editor';
import editorSaga from './editorSaga';

function* rootSaga() {
  yield fork(
    editorSaga().watcher
  );
}

export default rootSaga;
