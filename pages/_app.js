import App from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxContext }  from 'react-redux';

import { wrapper } from '../redux/store';

import '../config/firebase';
import './app.css';

class Blog extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
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
            <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
              <Component {...pageProps} />
            </PersistGate>
          );
        }}
      </ReactReduxContext.Consumer>
    );
  }
}

export default wrapper.withRedux(Blog);