const path = require('path');
const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
      '@app': path.resolve(__dirname, 'src'),
  },
  extensions: ['.ts', '.ios.js', '.android.js', '.json'],
};
module.exports = function(api) {
  api.cache(true);

  const presets = [
      'babel-preset-expo',
  ];

  const plugins = [
      ['module-resolver', moduleResolverConfig],
  ];

  return { presets, plugins };
};
