import App from 'next/app';
import React from 'react';
import Link from 'next/link';

import '../styles/main.css';

export default class SubgregatorApp extends App {
  componentDidCatch(error, errorInfo) {
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Link href="/">
          <h1 className="font-sans text-3xl md:text-6xl text-center cursor-pointer">
            Subgregator
          </h1>
        </Link>
        <Component {...pageProps} />
      </>
    );
  }
}
