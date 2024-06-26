/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react-compiler'],
  globals: { JSX: true },
  rules: {
    'react-compiler/react-compiler': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
