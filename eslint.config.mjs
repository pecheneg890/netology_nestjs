import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "prefer-const": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-undef": "error",
  }
  }
];