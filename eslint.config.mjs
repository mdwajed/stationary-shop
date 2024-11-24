import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-unused-expressions": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
    globals: {
      " process": "readonly",
    },
  },
  {
    ignores: [".node_modules/*", "dist"],
  },
];
