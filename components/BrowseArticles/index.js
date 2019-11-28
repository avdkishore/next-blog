import React from 'react';
import Link from 'next/link';

export default class BrowseArticles extends React.Component {
  renderArticles(data) {
    return (
      <ul>
        {data.map((item, i) => (
          <Link href={`/articles/${item.id}`}>
            <li>{item.data.title}</li>
          </Link>
        ))}
      </ul>
    )
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {this.renderArticles(data)}
      </div>
    )
  }
}