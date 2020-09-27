import React from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import ArticleDetails from '../../components/ArticleDetails';
import BrowseArticles from '../../components/BrowseArticles';

class Articles extends React.Component {
  static async getInitialProps({ query }) {
    if (query.id) {
      try {
        const res = await fetch(`http://localhost:8008/article/${query.id}`);
        const json = await res.json();
  
        const { id, data: { title, editorData } } = json;
  
        return { id, data: { title, editorData: JSON.parse(editorData) }}
      } catch (e) {
        console.log('error => ', e);
        return {}
      }
    }

    const res = await fetch('http://localhost:8008/articles');
    const json = await res.json();

    return { id: null, data: json }
  }

  renderArticles() {
    const { id, data } = this.props;

    if (id) {
      return <ArticleDetails id={id} data={data} />
    }
    
    return <BrowseArticles data={data} />
  }

  render() {
    return this.renderArticles();
  }
}

export default withRouter(Articles);