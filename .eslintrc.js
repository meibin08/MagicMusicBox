module.exports = {
  extends: ['erb','za/react', 'prettier'],
  env: {
    browser:true,
    es2021:true,
    node:true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx','*.js', '*.jsx'],
      extends: ['za/typescript-react', 'prettier'],
    },
  ],
  rules:{
    "react/prop-types": "off",
    "react/require-default-props": "off",
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'promise/catch-or-return': 'off',
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [], "ignoreOnInitialization": false }],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        varsIgnorePattern: '^_',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};

// module.exports = {
//   extends: ['erb'],
//   rules: {
//     // A temporary hack related to IDE not resolving correct package.json
//     'import/no-extraneous-dependencies': 'off',
//     'import/no-unresolved': 'error',
//     // Since React 17 and typescript 4.1 you can safely disable the rule
//     'react/react-in-jsx-scope': 'off',
//     'react/jsx-props-no-spreading': 'off',
//     'promise/catch-or-return': 'off',
//     '@typescript-eslint/no-unused-vars': [
//       2,
//       {
//         varsIgnorePattern: '^_',
//         args: 'after-used',
//         ignoreRestSiblings: true,
//       },
//     ],
//   },
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//     project: './tsconfig.json',
//     tsconfigRootDir: __dirname,
//     createDefaultProgram: true,
//   },
//   settings: {
//     'import/resolver': {
//       // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
//       node: {},
//       webpack: {
//         config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
//       },
//       typescript: {},
//     },
//     'import/parsers': {
//       '@typescript-eslint/parser': ['.ts', '.tsx'],
//     },
//   },
// };
