export const constants = {
  SAVE_ARTICLE_PENDING: 'SAVE_ARTICLE_PENDING',
  SAVE_ARTICLE_SUCCESS: 'SAVE_ARTICLE_SUCCESS',
  SAVE_ARTICLE_FAILURE: 'SAVE_ARTICLE_FAILURE'
};

export const saveArticlePending = () => ({
  type: constants.SAVE_ARTICLE_PENDING,
  payload: {}
});

export const saveArticleSuccess = () => ({
  type: constants.SAVE_ARTICLE_SUCCESS,
  payload: {}
});

export const saveArticleFailure = () => ({
  type: constants.SAVE_ARTICLE_FAILURE,
  payload: {}
});

export default {
  saveArticlePending,
  saveArticleFailure,
  saveArticleSuccess
};
