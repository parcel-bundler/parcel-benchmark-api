const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSvgr = require('next-svgr');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps(
  withSvgr(
    withCSS({
      target: 'serverless',
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
  )
);
