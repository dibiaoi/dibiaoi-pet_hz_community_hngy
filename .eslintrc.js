module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-debugger": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-function-paren": 'off',
    "space-before-blocks": 'off',
    "indent": 0,
    "key-spacing": 0,
    "quotes": 0,
    "comma-spacing": 0,
    "semi": 0,
    "spaced-comment": 0,
    "eol-last": 0,
    "no-lone-blocks": 0,
    "space-in-parens": 0,
    "no-multi-spaces":0,
    "no-dupe-keys": 1,
    "prefer-const": 1,
    "eqeqeq": 1,
    "no-useless-return": 0,
    "import/no-duplicates": 1,
    "camelcase": 0,
    "no-useless-escape": 0
  }
}
