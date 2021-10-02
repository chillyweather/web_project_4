const presets = [
  ['@babel/preset-env', {
    targets: {
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // use polyfills for the browsers specified in the above targets option
    // Babel uses polyfills from the core-js library
    useBuiltIns: "entry",
    corejs: '^3',
  }]
];

module.exports = { presets };