import React from 'react';
import dynamic from 'next/dynamic';

import { deserializer } from '../../utils';
import classes from './article_details.module.css';

const EditorComponent = dynamic(
  () => import('../../components/Editor'),
  { ssr: false }
)

export default class ArticleDetails extends React.Component {
  buildHTML(data) {
    const html = deserializer(data.editorData);
    return {
      __html: html
    };
  }

  renderTitle(data) {
    return data.title;
  }

  renderEditor(id, data) {
    return (
      <EditorComponent editable={false} data={data.editorData} articleId={id}/>
    );
  }

  render() {
    const { id, data } = this.props;
    console.log(data);
    return (
      <div className="app">
        <div className={classes["app-body"]}>
          <div id="codex-editor" className={classes["editor-wrapper"]}>
            <header className={classes["app-header"]}>
              <div contentEditable="true" placeholder="Title of the story" className={classes["header-title"]} autoFocus>
                {this.renderTitle(data)}
              </div>
            </header>
            {/* <div dangerouslySetInnerHTML={this.buildHTML(data)}/> */}
            {this.renderEditor(id, data)}
          </div>
        </div>
      </div>
    );
  }
}