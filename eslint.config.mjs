import css from "@eslint/css";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  { files: ["tests/**/*.js", "**/*.test.js"], languageOptions: { globals: { ...globals.jest, ...globals.node } } },
  {
    files: ["infra/**/*.js", "jest.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  { ...pluginReact.configs.flat.recommended, settings: { react: { version: "18.2" } } },
  pluginReact.configs.flat["jsx-runtime"],
]);
