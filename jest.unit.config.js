module.exports = {
  globals: {
    'vue-jest': {
      babelConfig: true,
    },
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest'
  }
}