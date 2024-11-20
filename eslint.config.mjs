import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-unused-vars": "error", //variable is defined but never used
      "no-console": "warn", //if any console is exist in project, it will give warning
      "prefer-const": "error", //a variable is declare with let or var, but it prefer const
      "no-unused-expressions": "error",// 5; Unused expression: this doesn't do anything
      //x + 2;  // Unused expression: result isn't assigned or used
      "no-undef": "error" //a variable is used, but never defined
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];