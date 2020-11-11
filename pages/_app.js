import App from 'next/app';
import { ReactReduxContext }  from 'react-redux';

import { wrapper } from '../redux/store';

import '../config/firebase';
import './app.css';

class Blog extends App {
  static async getInitialProps(appContext) {
    console.log('appContext => ', appContext);
    const appProps = appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext) : {};
    return { ...appProps };
  }

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          return (
            <Component {...pageProps} />
          );
        }}
      </ReactReduxContext.Consumer>
    );
  }
}

export default wrapper.withRedux(Blog);