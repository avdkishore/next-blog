import { HYDRATE } from 'next-redux-wrapper';

import { constants } from '../actions/editor';

const initialState = {
  saved: false,
  error: false,
  saving: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case HYDRATE: {
    return { ...state, ...action.payload };
  }

  case constants.SAVE_ARTICLE_FAILURE: {
    return {
      ...state,
      error: true
    };
  }

  case constants.SAVE_ARTICLE_PENDING: {
    return {
      ...state,
      saving: true
    };
  }

  case constants.SAVE_ARTICLE_SUCCESS: {
    return {
      ...state,
      saved: true
    };
  }
    
  default:
    return state;
  }
}

export default reducer;
