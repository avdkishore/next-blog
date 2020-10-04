export const constants = {
    SAVE_ARTICLE_PENDING: "SAVE_ARTICLE_PENDING",
    SAVE_ARTICLE_SUCCESS: "SAVE_ARTICLE_SUCCESS",
    SAVE_ARTICLE_FAILURE: "SAVE_ARTICLE_FAILURE"
};

export const saveArticlePending = () => ({
    type: SAVE_ARTICLE_PENDING,
    payload: {}
});

export const saveArticleSuccess = () => ({
    type: SAVE_ARTICLE_SUCCESS,
    payload: {}
});

export const saveArticleFailure = () => ({
    type: SAVE_ARTICLE_FAILURE,
    payload: {}
});

export default {
    saveArticlePending: saveArticlePending,
    saveArticleFailure: saveArticleFailure,
    saveArticleSuccess: saveArticleSuccess
};
