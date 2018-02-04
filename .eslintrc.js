// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'curly': ['error', 'all'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'valid-typeof': 'error',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-with': 1,
    'no-empty': 'error',
    'no-extra-semi': 'error',
    'no-empty-pattern': 'error',
    'no-native-reassign': 'error',
    'no-multi-spaces': 0,
    'spaced-comment': 0,
    'no-control-regex': 0,
    'prefer-promise-reject-errors': 0
  }
}
