module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',          
    "quotes": [2, "single", { "avoidEscape": true }],
    "indent" : ["warn",4],
    "semi" :["warn","always"],    
    "no-var": "error",
    "camelcase" :"warn",
    "no-trailing-spaces": ["off", { "skipBlankLines": true , "ignoreComments": false}],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["off", "always"],
    "spaced-comment" :"off",
    "keyword-spacing":[2, {"overrides": {
      "if": {"after": false},
      "for": {"after": false},
      "while": {"after": false}
    }}],
    "padded-blocks": ["error", "never"],
    "no-unused-vars":"off",
    "arrow-spacing":"off",
    "object-curly-spacing":"off",
    "eol-last":["off", "always"],
    "one-var":"off",
    "comma-dangle":"off"    
  }
}
