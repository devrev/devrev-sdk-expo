const createConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  const config = await createConfigAsync(
    {
      ...env,
      babel: {
        // Keep the transpilation for your plugin
        // This is still needed even when using the npm package
        dangerouslyAddModulePathsToTranspile: ['expo-native-configuration'],
      },
    },
    argv
  );

  // Simplify to only use the local node_modules
  // No need to reference the parent directory modules anymore
  config.resolve.modules = [
    path.resolve(__dirname, './node_modules'),
  ];

  return config;
};
