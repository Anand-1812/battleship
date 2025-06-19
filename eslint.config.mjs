import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    languageOptions: {
      globals: {
        ...globals.browser, // so `alert`, `window`, etc. are recognized
      },
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);
