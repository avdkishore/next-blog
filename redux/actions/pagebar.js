export const constants = {
  SET_PAGEBAR_REF: 'SET_PAGEBAR_REF',
};

export const setPagebarRef = (payload) => {
  return {
    type: constants.SET_PAGEBAR_REF,
    payload
  };
};

export default {
  setPagebarRef
};
