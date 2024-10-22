/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  parserOptions: {
    parser: require.resolve("@typescript-eslint/parser"),
    extraFileExtensions: [".vue"],
  },

  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    "plugin:@typescript-eslint/recommended",

    // https://eslint.vuejs.org/rules/#available-rules
    "plugin:vue/vue3-recommended",

    // https://github.com/prettier/eslint-config-prettier#installation
    "prettier",
  ],

  plugins: [
    "@typescript-eslint",

    "simple-import-sort",

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    "vue",
  ],

  rules: {
    quotes: "off",
    "prefer-promise-reject-errors": "off",
    "no-unused-vars": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    "no-duplicate-imports": "error",

    // disable enums
    "no-restricted-syntax": [
      "error",
      { selector: "TSEnumDeclaration", message: "Don't declare enums" },
    ],

    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",

    // https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns
    "vue/require-default-prop": "off",
    "vue/attributes-order": [
      "warn",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          ["UNIQUE", "SLOT"],
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "ATTR_DYNAMIC",
          "ATTR_STATIC",
          "ATTR_SHORTHAND_BOOL",
          "EVENTS",
          "CONTENT",
        ],
        alphabetical: true,
      },
    ],

    // https://eslint.vuejs.org/rules/#uncategorized
    "vue/block-lang": ["error", { script: { lang: "ts" } }],
    "vue/no-boolean-default": ["error", "no-default"],
    "vue/component-tags-order": [
      "error",
      { order: ["script", "template", "style"] },
    ],
    "vue/define-props-declaration": ["error", "type-based"],
    "vue/define-emits-declaration": ["error", "type-based"],
    "vue/component-api-style": ["error", ["script-setup"]],
    "vue/custom-event-name-casing": ["error", "camelCase"],
    "vue/define-macros-order": [
      "error",
      { order: ["defineProps", "defineEmits", "defineSlots", "defineModel"] },
    ],
    "vue/enforce-style-attribute": [
      "error",
      { allow: ["module", "scoped", "plain"] },
    ],
    "vue/no-empty-component-block": "error",
    "vue/no-multiple-objects-in-class": "error",
    "vue/multi-word-component-names": "off",
    "vue/no-required-prop-with-default": ["error", { autofix: false }],
    "vue/no-static-inline-styles": ["error", { allowBinding: false }],
    "vue/no-unused-emit-declarations": "error",
    "vue/no-unused-refs": "error",
    "vue/no-use-v-else-with-v-for": "error",
    "vue/no-useless-v-bind": "error",
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/require-macro-variable-name": [
      "error",
      {
        defineProps: "props",
        defineEmits: "emit",
        defineSlots: "slots",
        useSlots: "slots",
        useAttrs: "attrs",
      },
    ],
    "vue/require-typed-ref": "error",
    "vue/v-for-delimiter-style": ["error", "in"],
  },
};
