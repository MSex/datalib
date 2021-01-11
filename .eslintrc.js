module.exports = {
  env: {
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jsdoc", "prefer-arrow", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["warn"],

    "arrow-body-style": ["error", "as-needed"],
    //  "requireReturnForObjectLiteral": true,
    "prefer-arrow-callback": ["error"],
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
};
