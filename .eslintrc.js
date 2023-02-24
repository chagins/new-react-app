module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  "root": true,
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react', 'react-hooks', '@typescript-eslint', 'jest', 'import', 'prettier', 'promise', 'jsx-a11y'
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "comma-dangle": ["error", "only-multiline"],
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "@typescript-eslint/no-explicit-any": "error"
  },
  'settings': {
    "react": {
      "version": "detect"
    }
  }
};
