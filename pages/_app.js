import App from 'next/app';
import React from 'react';

import '../styles/main.css';

export default class SubgregatorApp extends App {
  componentDidCatch(error, errorInfo) {
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
