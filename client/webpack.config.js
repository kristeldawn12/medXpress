/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
  // ... other webpack config options ...
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
    },
  },
};
