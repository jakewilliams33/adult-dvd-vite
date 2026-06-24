module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    // Project doesn't use PropTypes (modern React, no runtime prop checks).
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // Build/config scripts run in Node, not the browser.
      files: ['vite.config.js', 'prerender.js'],
      env: { node: true },
    },
    {
      // React Three Fiber elements take props (intensity, position, object…)
      // that aren't real DOM attributes; the rule doesn't understand R3F.
      files: ['src/ThreeScene.jsx'],
      rules: { 'react/no-unknown-property': 'off' },
    },
  ],
}
