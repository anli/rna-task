module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@themes': './src/themes',
          '@utils': './src/utils',
          '@mocks': './__mocks__',
          '@authentication': './src/authentication',
          '@components': './src/components',
          '@test': './src/test',
          '@store': './src/store',
          '@task': './src/task',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
