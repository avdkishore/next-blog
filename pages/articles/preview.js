import Router, { withRouter } from 'next/router';

class ArticlePreview extends React.Component {
  render() {
    return (
      <div>Preview page of article</div>
    );
  }
}

export default withRouter(ArticlePreview);