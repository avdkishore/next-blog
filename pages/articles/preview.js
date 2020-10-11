import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';

class ArticlePreview extends Component {
    render() {
        return (
            <div>Preview page of article</div>
        )
    }
}

export default withRouter(ArticlePreview);;