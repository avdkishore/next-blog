import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import fetch from 'isomorphic-unfetch';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';

import firebase from '../config/firebase';

// import Table from '@editorjs/table';

const data = {
  'time': 1563816717958,
  'blocks': [{
    'type': 'header',
    'data': {
      'text': 'Editor.js',
      'level': 2
    }
  },
  {
    'type':'image',
    'data':{
      'file':{
        'url':'https://cdn.pixabay.com/photo/2015/03/26/09/41/chain-690088_1280.jpg'
      },
      'caption':'',
      'withBorder':true,
      'stretched':false,
      'withBackground':false
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
    }
  },
  {
    'type': 'header',
    'data': {
      'text': 'Key features',
      'level': 3
    }
  },
  {
    'type': 'list',
    'data': {
      'style': 'unordered',
      'items': [
        'It is a block-styled editor',
        'It returns clean data output in JSON',
        'Designed to be extendable and pluggable with a simple API'
      ]
    }
  },
  {
    'type': 'header',
    'data': {
      'text': 'What does it mean «block-styled editor»',
      'level': 3
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.'
    }
  },
  {
    'type': 'header',
    'data': {
      'text': 'What does it mean clean data output',
      'level': 3
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'Clean data is useful to sanitize, validate and process on the backend.'
    }
  },
  {
    'type': 'delimiter',
    'data': {}
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it\'s core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
    }
  },
  {
    'type': 'image',
    'data': {
      'file': {
        'url': 'https://images.unsplash.com/photo-1572289233642-001021482efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      'caption': 'Image caption',
      'withBorder': true,
      'stretched': false,
      'withBackground': false
    }
  },
  {
    'type':'checklist',
    'data': {
      'items': [{'text':'first','checked':true}, {'text':'second','checked':false}, {'text':'third','checked':false}]
    }
  }
  ],
  'version': '2.15.0'
};

const db = firebase.firestore();

const editor = new EditorJS({
  /** 
   * Id of Element that should contain the Editor 
   */ 
  holder: 'codex-editor', 

  /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */ 
  tools: {
    header: {
      class: Header, 
      inlineToolbar: ['link'] ,
      config: {
        placeHolder: 'Header'
      },
      shortcut: 'CMD+SHIFT+H'
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        },
        captionPlaceholder: 'Caption for your image',
        buttonContent: 'Select an image to add',
        uploader: {
          uploadByFile(file) {
            let formData = new FormData();
            formData.append('image', file);

            return fetch('http://localhost:8008/uploadFile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: formData
            });
          },

          uploadByUrl(url) {
            return Promise.resolve();
          }
        }
      }
    },
    list: { 
      class: List, 
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
      shortcut: 'CMD+SHIFT+O'
    },
    warning: Warning,
    marker: {
      class:  Marker,
      shortcut: 'CMD+SHIFT+M'
    },
    code: {
      class:  CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },
    linkTool: LinkTool,
    embed: {
      class: Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          coub: true,
          facebook: true,
          codepen: {
            regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
            embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
            html: '<iframe height=\'300\' scrolling=\'no\' frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'></iframe>',
            height: 300,
            width: 600,
            id: (groups) => groups.join('/embed/')
          }
        }
      }
    },
    // table: {
    //   class: Table,
    //   inlineToolbar: true,
    //   shortcut: 'CMD+ALT+T'
    // },
  }, 

  /**
   * Previously saved data that should be rendered
   */
  data: {},

  /**
    * onReady callback
    */
  onReady: () => {

    /** Hack to make the editor content non editable */
    if (!editor.editable) {
      const elements = document.querySelectorAll('[contenteditable=true]');
      
      elements.forEach(element => {
        element.setAttribute('contenteditable' , false);
      });
  
      document.getElementsByClassName('ce-toolbar')[0].style.display='none';
    }
  },

  /**
   * onChange callback
   */
  onChange: (e) => {
    console.log('Editor.js content is changed',editor.editable, e);
    if (!editor.editable) {
      // const elem = document.getElementsByClassName('ce-block ce-block--focused');
      const focusedElement = document.querySelectorAll('div.ce-block.ce-block--focused');
      console.log('focusedElement => ', focusedElement);
      focusedElement.forEach(element => {
        console.log('focusedElement => ', focusedElement);
        if (element.getAttribute('contenteditable') !== 'false') {
          element.setAttribute('contenteditable' , false);
          element.style.backgroundImage = 'none';
        }
      });
  
      const focusedElementChildren = document.querySelectorAll('div.ce-paragraph.cdx-block');
      console.log('focusedElementChildren => ', focusedElementChildren);
      focusedElementChildren.forEach(element => {
        if (element.getAttribute('contenteditable') !== 'false') {
          element.setAttribute('contenteditable' , false);
        }
      });

      // double click on the text to get this toolbar
      const toolbarElem = document.querySelectorAll('div.ce-conversion-toolbar.ce-conversion-toolbar--showed');
      console.log('toolbarElem => ', toolbarElem);
      toolbarElem.forEach(element => {
        if (element.style.display !== 'none') {
          element.style.display = 'none';
        }
      });
    }
  },

  /**
   * Enable autofocus
   */ 
  autofocus: false,

  /**
   * Place holder for the default initialBlock
   */
  placeholder: 'Let`s write an awesome story!',
  // initialBlock: 'paragraph'
});

export default class Editor extends React.Component {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
    articleId: PropTypes.string,
    data: PropTypes.object,
    updateRoute: PropTypes.func
  }

  static defaultProps = {
    editable: false
  }

  constructor(props) {
    super(props);

    this.saveEditorState = this.saveEditorState.bind(this);
    this.createOrSave = this.createOrSave.bind(this);
  }

  async createOrSave({ articleId, editorData, title }) {
    let id = articleId;

    if (!articleId) {
      const docRef = await db.collection('articles').add({
        title,
        editorData: JSON.stringify(editorData)
      });

      id = docRef.id;

      return this.props.updateRoute(id);
    }

    await db.collection('articles').doc(articleId).set({
      title,
      editorData: JSON.stringify(editorData)
    });

    return this.props.updateRoute(id);
  }

  makeEditorReadonly = () => {
    const elements = document.querySelectorAll('[contenteditable=true]');

    elements.forEach(element => {
      element.setAttribute('contenteditable' , false);
    });

    // document.getElementsByClassName('ce-toolbar')[0].style.display="none"

  }

  getTitle() {
    const titleElement = document.querySelectorAll('[contenteditable=true]')[0];

    if (titleElement) return titleElement.innerText;
    return '';
  }

  async InitializeEditor(editable, data) {
    try {
      editor.editable = editable;
      
      await editor.isReady;
      
      if (data) {
        await editor.render(data);
      }
      
      if (!editable) this.makeEditorReadonly();

    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`);
    }
  }

  async saveEditorState() {
    const { articleId } = this.props;

    try {
      const title = this.getTitle();
      if (!title) return;
      
      const savedData = await editor.save();
      if (savedData.blocks.length === 0) return null;
      
      this.createOrSave({ articleId, editorData: savedData, title });
    } catch (e) {
      console.log('Saving failed: ', e);
    }
  }

  render() {
    if (typeof window === undefined) return null;

    const { editable, data } = this.props;

    this.InitializeEditor(editable, data);

    if (!editable) return <div></div>;
    
    return (
      <button onClick={this.saveEditorState}>Save the data</button>
    );
  }
}
