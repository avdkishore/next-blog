import React from 'react';
import Link from 'next/link';
import classes from './index.css';
import { cssUtils } from '../../utils';

export default class BrowseArticles extends React.Component {
  renderPreview(item) {
    return (
      <div className={classes['item-wrapper']}>
        <div className={classes.image}></div>
        <div className={classes.title}>
          {item.data.title}
        </div>
        <div className={cssUtils.getClassName(classes.body, classes['truncate-overflow'])}>{`THis is the description of the article. A small one, but precise one. This will show up in the articles page. Also checko out for the text truncation in these texts, whether it is working or not.`}</div>
      </div>
    )
  }

  renderArticles(data) {
    console.log('data => ', data);
    return (
      <div className={classes['preview-wrapper']}>
        {
          data.map((item, i) => (
            <Link key={i} href={`/articles/${item.id}`}>
              {this.renderPreview(item)}
            </Link>
          ))
        }
      </div>
    )
  }

  render() {
    const { data } = this.props;

    return this.renderArticles(data);
  }
}