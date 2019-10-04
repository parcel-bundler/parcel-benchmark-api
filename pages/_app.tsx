import React from 'react';
import App from 'next/app';

import sentry from '../utils/sentry';

const { Sentry, captureException } = sentry();

if (typeof window !== 'undefined') {
  const WebFont = require('webfontloader');

  WebFont.load({
    google: {
      families: ['Montserrat']
    }
  });
}

// @ts-ignore
export default class MyApp extends App {
  // @ts-ignore
  constructor(...args) {
    // @ts-ignore
    super(...args);

    this.state = {
      hasError: false,
      errorEventId: undefined
    };

    this.handleReportClick = this.handleReportClick.bind(this);
  }

  // @ts-ignore
  static async getInitialProps({ Component, ctx }) {
    try {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      const errorEventId = captureException(error, ctx);
      return {
        hasError: true,
        errorEventId
      };
    }
  }

  // @ts-ignore
  static getDerivedStateFromProps(props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  // @ts-ignore
  componentDidCatch(error, errorInfo) {
    const errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId });
  }

  handleReportClick() {
    // @ts-ignore
    Sentry.showReportDialog({ eventId: this.state.errorEventId });
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <section className="w-full flex min-h-screen items-center justify-center">
          <div className="bg-gray-100 rounded p-4 shadow text-gray-700">
            <h1 className="border-b font-semibold text-lg mb-4 px-4 py-2">There was an error!</h1>
            <p className="text-center my-2">
              <a
                href="#"
                onClick={this.handleReportClick}
                className="block text-white rounded py-2 px-4 w-full bg-red-600"
              >
                📣 Report this error
              </a>
            </p>
            <p className="text-center my-2">OR</p>
            <p className="text-center my-2">
              <a
                href="#"
                onClick={() => {
                  window.location.reload(true);
                }}
                className="block text-white rounded py-2 px-4 w-full bg-blue-600"
              >
                Reload the page
              </a>
            </p>
          </div>
        </section>
      );
    } else {
      // Render the normal Next.js page
      return super.render();
    }
  }
}
