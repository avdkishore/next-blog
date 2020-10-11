import App from 'next/app';

import { wrapper } from '../redux/store';

import PageBar from '../components/PageBar';

import '../config/firebase';
import './app.css';

class BlogApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <PageBar />
        <Component {...pageProps} />
      </>
    );
  }
}

export default wrapper.withRedux(BlogApp);