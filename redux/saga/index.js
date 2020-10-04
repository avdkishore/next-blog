import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import editorSaga from './editorSaga';

function* rootSaga() {
  yield fork(
    editorSaga().watcher()
  );
}

export default rootSaga;
