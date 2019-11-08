import React from 'react';
import dynamic from 'next/dynamic';
import Router, { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import classes from './app.css';

const EditorComponent = dynamic(
  () => import('../../components/Editor'),
  { ssr: false }
)

class EditArticle extends React.Component {
  constructor(props) {
    super(props);

    this.updateRoute = this.updateRoute.bind(this);
  }

  static async getInitialProps({ pathname, query, asPath }) {
    console.log('router => ', Router)
    // fetching the article should be handled here
    let data = {
      "time": 1563816717958,
      "blocks": [{
          "type": "header",
          "data": {
            "text": "Editor.js",
            "level": 2
          }
        },
        {
          "type":"image",
          "data":{
            "file":{
              "url":"https://cdn.pixabay.com/photo/2015/03/26/09/41/chain-690088_1280.jpg"
            },
            "caption":"",
            "withBorder":true,
            "stretched":false,
            "withBackground":false
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
          }
        },
        {
          "type": "header",
          "data": {
            "text": "Key features",
            "level": 3
          }
        },
        {
          "type": "list",
          "data": {
            "style": "unordered",
            "items": [
              "It is a block-styled editor",
              "It returns clean data output in JSON",
              "Designed to be extendable and pluggable with a simple API"
            ]
          }
        },
        {
          "type": "header",
          "data": {
            "text": "What does it mean «block-styled editor»",
            "level": 3
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
          }
        },
        {
          "type": "header",
          "data": {
            "text": "What does it mean clean data output",
            "level": 3
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "Clean data is useful to sanitize, validate and process on the backend."
          }
        },
        {
          "type": "delimiter",
          "data": {}
        },
        {
          "type": "paragraph",
          "data": {
            "text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
          }
        },
        {
          "type": "image",
          "data": {
            "file": {
              "url": "https://images.unsplash.com/photo-1572289233642-001021482efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            },
            "caption": "Image caption",
            "withBorder": true,
            "stretched": false,
            "withBackground": false
          }
        },
        {
          "type":"checklist",
          "data": {
            "items": [{"text":"first","checked":true}, {"text":"second","checked":false}, {"text":"third","checked":false}]
          }
        }
      ],
      "version": "2.15.0"
    };

    const articleId = query && query.id;

    if (articleId) {
      try {
        const res = await fetch(`http://localhost:8008/article/${articleId}`);
        const json = await res.json();

        const { id, data: { title, editorData } } = json;

        return { articleId: id, title, editorData: JSON.parse(editorData) }
      } catch (e) {
        console.log('error ->', e);
        return { articleId: null }
      }
    }

    return { articleId: null };
  }

  renderEditor(props) {
    return (
      <EditorComponent {...props}/>
    );
  }

  renderTitle(title) {
    if (title) return title;
    return ''
  }

  updateRoute(id) {
    const { router } = this.props;
    if (!router) return;

    router.replace(
      `/articles/edit?id=${id}`,
      `/articles/edit/${id}`,
      { shallow: true }
    );
  }

  render() {
    const { articleId, title, editorData } = this.props;
    const props = articleId ? { editable: true, data: editorData, articleId, updateRoute: this.updateRoute } : { editable: true, updateRoute: this.updateRoute };

    return (
      <div className="app">
        {/* <div className="theme-settings"><a href="#">Change the theme</a></div> */}
        <div className={classes["app-body"]}>
          <div id="codex-editor" className={classes["editor-wrapper"]}>
            {this.renderEditor(props)}
            <header className={classes["app-header"]}>
              <div contentEditable="true" placeholder="Title of the story" className={classes["header-title"]} autoFocus>
                {this.renderTitle(title)}
              </div>
            </header>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditArticle);