import { HYDRATE } from 'next-redux-wrapper';

import { constants } from '../actions/pagebar';

const initialState = {
  ref: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case HYDRATE: {
    return { ...state, ...action.payload.pagebar };
  }

  case constants.SET_PAGEBAR_REF: {
    return {
      ...state,
      ref: action.payload
    };
  }
    
  default:
    return state;
  }
}

export default reducer;
