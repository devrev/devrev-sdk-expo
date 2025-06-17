// metro.config.js for standalone app
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Remove references to parent directories since we'll use the npm package
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, './node_modules'),
];

// Remove the extraNodeModules reference to the parent directory
config.resolver.extraNodeModules = {
  // This will use the npm package instead of local reference
  // Remove this line or replace with any custom aliases you need
};

// Remove watchFolders since we don't need to watch the parent project
// config.watchFolders = []; // Not needed, will use default

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
