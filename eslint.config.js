/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import pluginAstro from "eslint-plugin-astro";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.astro"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2020 },
      sourceType: "module",
      ecmaVersion: "latest",
      parserOptions: {
        project: "./tsconfig.json",
      },
      parser: tseslintParser,
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx", ".astro"],
      },
    },
    plugins: {
      import: fixupPluginRules(pluginImport),
      "@typescript-eslint": pluginTs,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strict,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.stylisticTypeChecked,
  ...pluginAstro.configs.recommended,
  prettier,
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "import/consistent-type-specifier-style": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "object", "type", "index"],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
      "no-console": "warn",
      "no-use-before-define": "error",
      "prefer-template": "error",
    },
  }
);

export default config;
