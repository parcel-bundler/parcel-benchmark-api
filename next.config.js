const webpack = require('webpack');
const withSvgr = require('next-svgr');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps(
  withSvgr({
    webpack: (config, { isServer, buildId }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.SENTRY_RELEASE': JSON.stringify(buildId)
        })
      );

      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      return config;
    }
  })
);
