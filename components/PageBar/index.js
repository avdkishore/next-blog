import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './pagebar.module.css';

export default class PageBar extends Component {

    static propTypes = {
        backgroundColor: PropTypes.string,
        title: PropTypes.string,
        isEditMode: PropTypes.bool,
        isSaved: PropTypes.bool,

        // functions to be called for actions
        onSaveDraft: PropTypes.func,
        onDeleteDraft: PropTypes.func,
        onPublishDraft: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    renderLeft = () => (
        <div className={classes["left-container"]}>
          <div className={classes["logo"]}>
            <img src="https://picsum.photos/40" />
          </div>
          <div className={classes["left-info-container"]}>
            <span className={classes["mode-title"]}>
                    Draft
            </span>
            <span className={classes["status-text"]}>
                    Saved
            </span>
          </div>
        </div>
    );    

    renderPageBar() {
        return (
            <div className={classes["pagebar-container"]}>
                {this.renderLeft()}
              <div className={classes["save-button-container"]}>
              <button className={classes["save-button"]}>
                <span className={classes["save-text"]}>Save</span>
              </button>
              </div>
            </div>
          );
    }

    render() {
        return this.renderPageBar();
    }

}