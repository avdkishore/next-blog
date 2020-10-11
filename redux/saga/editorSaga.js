import { fork, takeEvery, take, put, call } from 'redux-saga/effects';
import editorActions, { constants } from '../actions/editor';

export default () => {
  function* save() {
    while(true) {
      const { payload } = yield take(constants.SAVE_ARTICLE_PENDING);

      // Take necessary values from payload and send them over to the backend and then fire success or failure actions.

      const response = yield call('');

      if (response.status == 200 && response.ok) {
        yield put(editorActions.saveArticleSuccess());
      } else {
        yield put(editorActions.saveArticleFailure());
      }

    } 
  }

  function* watcher() {
    yield fork(save);
  }

  return {
    watcher
  };
};

// export default editorSaga;