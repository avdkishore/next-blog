module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'globals': {
    'React': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'modules': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/react-in-jsx-scope': 'off', // If you're using NEXT.js then you do not require to import React at top of files, nextjs does that for you.
    'react/jsx-filename-extension': [
      1, 
      { 'extensions': ['.js', '.jsx'] }
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect',
    }
  }
};
