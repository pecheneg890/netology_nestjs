import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "prefer-const": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "error",
      "@typescript-eslint/no-unsafe-function-type": "off"
  }
  }
];