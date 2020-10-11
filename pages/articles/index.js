import { withRouter } from 'next/router';

import firebase from '../../config/firebase';

import ArticleDetails from '../../components/ArticleDetails';
import BrowseArticles from '../../components/BrowseArticles';

class Articles extends React.Component {
  static async getInitialProps({ query }) {
    const db = firebase.firestore();
    if (query.id) {
      try {
        const snapshot = await db.collection('articles').doc(query.id).get();
        const { title, editorData } = snapshot.data();

        return { id: query.id, data: { title, editorData: JSON.parse(editorData) }};
      } catch (e) {
        console.log('error => ', e);
        return {};
      }
    }

    const snapshot = await db.collection('articles').get();

    const articles = snapshot.docs.map(doc => ({
      data: doc.data(),
      id: doc.id
    }));

    return { id: null, data: articles };
  }

  renderArticles() {
    const { id, data } = this.props;

    if (id) {
      return <ArticleDetails id={id} data={data} />;
    }
    
    return <BrowseArticles data={data} />;
  }

  render() {
    return this.renderArticles();
  }
}

export default withRouter(Articles);