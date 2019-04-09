// https://cn.eslint.org/docs/4.0.0/rules/
const baseEslintConfig = {
  "arrow-parens": 0,
  "no-mixed-operators": [
    0
  ],
  "max-len": [
    "warn",
    120
  ],
  "prefer-destructuring": [
    "error",
    {
      "object": true,
      "array": false
    }
  ],
  "linebreak-style": [
    0
  ],
  "generator-star-spacing": [
    0
  ],
  "consistent-return": [
    0
  ],
  "global-require": [
    0
  ],
  "no-else-return": [
    0
  ],
  "no-restricted-syntax": [
    0
  ],
  "no-param-reassign": [
    0
  ],
  "no-console": [
    "error",
    {
      "allow": [
        "warn",
        "error"
      ]
    }
  ],
  "no-unused-expressions": [
    0
  ],
  "no-use-before-define": [
    0
  ],
  "no-nested-ternary": [
    0
  ],
  "arrow-body-style": [
    0
  ],
  "no-bitwise": [
    0
  ],
  "no-cond-assign": [
    0
  ],
  "comma-dangle": [
    "error",
    {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore"
    }
  ],
  "object-curly-newline": [
    0
  ],
  "function-paren-newline": [
    0
  ],
  "no-restricted-globals": [
    0
  ],
  "require-yield": [
    1
  ],
}

// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
const typescriptElintConf = {
  "indent": "off",
  "@typescript-eslint/indent": [
    "error",
    2,
    {
      "VariableDeclarator": 1
    }
  ],
}

// 提示您的代码的浏览器兼容性
// https://github.com/amilajack/eslint-plugin-compat
const compatEslintConfig = {
  "compat/compat": "error"
}

// 导入导出语法linting
// https://github.com/benmosher/eslint-plugin-import
const importEslintConfig = {
  "import/prefer-default-export": [
    0
  ],
  "import/no-extraneous-dependencies": [
    0
  ],
  "import/no-unresolved": [
    0
  ],
  "import/extensions": [
    0
  ]
}

// https://github.com/evcohen/eslint-plugin-jsx-a11y
const jsxa11yEslintConfig = {
  "jsx-a11y/no-static-element-interactions": [
    0
  ],
  "jsx-a11y/no-noninteractive-element-interactions": [
    0
  ],
  "jsx-a11y/click-events-have-key-events": [
    0
  ],
  "jsx-a11y/anchor-is-valid": [
    0
  ],
}

// https://github.com/yannickcr/eslint-plugin-react
const reactEslintConfig = {
  // "react/jsx-no-bind": [
  //   0
  // ],
  "react/prop-types": [
    0
  ],
  "react/prefer-stateless-function": [
    0
  ],
  "react/jsx-wrap-multilines": [
    "error",
    {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "ignore"
    }
  ],
  "react/forbid-prop-types": [
    0
  ],
  "react/jsx-filename-extension": [
    1,
    {
      "extensions": [
        ".jsx"
      ]
    }
  ],
}

module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": ["airbnb", "plugin:@typescript-eslint/recommended"],
  "plugins": [
    "@typescript-eslint",
    "compat",
    "import",
    "jsx-a11y",
    "react",
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true,
    "jasmine": true
  },
  "rules": {
    ...baseEslintConfig,
    ...compatEslintConfig,
    ...importEslintConfig,
    ...jsxa11yEslintConfig,
    ...reactEslintConfig,
    ...typescriptElintConf,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true
    }
  },
  "settings": {
    "polyfills": [
      "fetch",
      "promises"
    ]
  }
}
